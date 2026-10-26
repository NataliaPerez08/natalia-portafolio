
const API = "https://api.github.com";

function base64url(bytes) {
  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

async function generateJWT(env) {
  const now = Math.floor(Date.now() / 1000);

  const header = {
    alg: "RS256",
    typ: "JWT"
  };

  const payload = {
    iat: now - 60,
    exp: now + 540,
    iss: String(env.GITHUB_APP_ID)
  };

  const encode = (value) =>
    base64url(
      new TextEncoder().encode(JSON.stringify(value))
    );

  const input = `${encode(header)}.${encode(payload)}`;

  const pem = env.GITHUB_APP_PRIVATE_KEY
    .replace(/\\n/g, "\n")
    .replace(/-----BEGIN PRIVATE KEY-----/g, "")
    .replace(/-----END PRIVATE KEY-----/g, "")
    .replace(/\s/g, "");

  const keyBytes = Uint8Array.from(
    atob(pem),
    char => char.charCodeAt(0)
  );

  const key = await crypto.subtle.importKey(
    "pkcs8",
    keyBytes,
    {
      name: "RSASSA-PKCS1-v1_5",
      hash: "SHA-256"
    },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    key,
    new TextEncoder().encode(input)
  );

  return `${input}.${base64url(new Uint8Array(signature))}`;
}

async function installationToken(env) {
  const jwt = await generateJWT(env);

  const response = await fetch(
    `${API}/app/installations/${env.GITHUB_APP_INSTALLATION_ID}/access_tokens`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwt}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        "User-Agent": "natalia-portfolio-approvals"
      }
    }
  );

  const body = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      `GitHub App authentication failed: ${response.status} ${body.message || ""}`
    );
  }

  return body.token;
}

export async function github(env, path, options = {}) {
  const token = await installationToken(env);

  const url =
    `${API}/repos/${env.GITHUB_OWNER}/${env.GITHUB_REPO}${path}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "natalia-portfolio-approvals",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...(options.headers || {})
    }
  });

  const body = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      `GitHub ${response.status}: ${body.message || "error"}`
    );
  }

  return body;
}

export const ALLOWED_PATHS = [
  "src/data/generated/github-projects.json"
];

export function isAllowedChangeSet(files) {
  return (
    files.length > 0 &&
    files.every(f => ALLOWED_PATHS.includes(f.filename))
  );
}

export async function diffDigest(files) {
  const input = [...files]
    .sort((a, b) => a.filename.localeCompare(b.filename))
    .map(f =>
      [f.filename, f.sha || "", f.status || "", f.additions ?? 0, f.deletions ?? 0].join("\u0000")
    )
    .join("\n");

  const bytes = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(input)
  );

  return [...new Uint8Array(bytes)]
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

export function checkPasses(check, headSha) {
  return (
    check.name === "test" &&
    check.app?.slug === "github-actions" &&
    check.app?.id === 15368 &&
    check.head_sha === headSha &&
    check.status === "completed" &&
    check.conclusion === "success"
  );
}

export async function verifyPR(env, record) {
  const pr = await github(env, `/pulls/${record.pr_number}`);

  if (
    pr.state !== "open" ||
    pr.base.ref !== "main" ||
    pr.base.repo?.full_name !==
      `${env.GITHUB_OWNER}/${env.GITHUB_REPO}` ||
    pr.head.repo?.full_name !==
      `${env.GITHUB_OWNER}/${env.GITHUB_REPO}` ||
    pr.head.repo?.fork !== false ||
    !pr.head.ref.startsWith("portfolio/sync-")
  ) {
    throw new Error("PR no autorizado");
  }

  if (
    pr.head.sha !== record.head_sha ||
    pr.base.sha !== record.base_sha
  ) {
    throw new Error("SHA cambió: se requiere nueva aprobación");
  }

  const files = await github(
    env,
    `/pulls/${record.pr_number}/files?per_page=100`
  );

  if (!isAllowedChangeSet(files)) {
    throw new Error("Archivos del PR no permitidos");
  }

  if ((await diffDigest(files)) !== record.diff_digest) {
    throw new Error("Contenido del PR cambió: se requiere nueva aprobación");
  }

  const checks = await github(
    env,
    `/commits/${pr.head.sha}/check-runs?per_page=100`
  );

  if (!checks.check_runs?.some(c => checkPasses(c, pr.head.sha))) {
    throw new Error("Checks requeridos no aprobados");
  }

  return pr;
}

export async function mergePR(env, record) {
  return github(env, `/pulls/${record.pr_number}/merge`, {
    method: "PUT",
    body: JSON.stringify({
      sha: record.head_sha,
      merge_method: "squash"
    })
  });
}

export async function closePR(env, record) {
  return github(env, `/pulls/${record.pr_number}`, {
    method: "PATCH",
    body: JSON.stringify({ state: "closed" })
  });
}
