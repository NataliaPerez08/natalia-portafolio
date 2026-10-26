CREATE TABLE IF NOT EXISTS proposals (
 id TEXT PRIMARY KEY, pr_number INTEGER NOT NULL, head_sha TEXT NOT NULL,
 base_sha TEXT NOT NULL, diff_digest TEXT NOT NULL, summary TEXT NOT NULL,
 status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending','processing','approved','rejected','expired','failed')),
 created_at TEXT NOT NULL, expires_at TEXT NOT NULL, decided_at TEXT,
 decided_by TEXT, UNIQUE(pr_number, head_sha)
);
CREATE TABLE IF NOT EXISTS approval_events (
 id INTEGER PRIMARY KEY AUTOINCREMENT, proposal_id TEXT NOT NULL,
 event_type TEXT NOT NULL, actor_id TEXT, created_at TEXT NOT NULL,
 details TEXT, FOREIGN KEY(proposal_id) REFERENCES proposals(id)
);
