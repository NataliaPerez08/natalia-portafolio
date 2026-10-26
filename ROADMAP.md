# Roadmap técnico — Agente de sincronización del portafolio con GitHub y aprobaciones por Telegram

**Proyecto:** `portafolioAdapter`  
**Repositorio:** `NataliaPerez08/natalia-portafolio`  
**Fecha de referencia:** 25 de octubre de 2026  
**Estado:** Integración parcial. Worker, Telegram y autenticación GitHub App funcionales; flujo de propuestas pendiente de prueba de extremo a extremo.

---

## 1. Objetivo del sistema

Desarrollar un agente que mantenga actualizado el portafolio personal a partir de la actividad pública de GitHub, sin reemplazar automáticamente el contenido editorial escrito manualmente.

El agente debe:

1. Detectar repositorios nuevos y cambios relevantes en proyectos existentes.
2. Proponer actualizaciones de descripciones, tecnologías, enlaces, actividad y contribuciones open source.
3. Preservar las descripciones, proyectos destacados y demás contenido seleccionado manualmente.
4. Crear propuestas verificables mediante Pull Requests.
5. Notificar cada propuesta a través de Telegram.
6. Permitir aprobar o rechazar cambios exclusivamente mediante una identidad autorizada.
7. Fusionar únicamente las propuestas aprobadas que hayan superado todas las validaciones.
8. Publicar los cambios usando GitHub Actions y GitHub Pages.

**Principio central:** la sincronización es automática; la publicación de cambios editoriales requiere aprobación humana.

## 2. Arquitectura prevista

```text
GitHub Repositories / Activity
            |
            v
GitHub Actions — Sync Job
            |
            v
Extract / Normalize / Compare
            |
            v
Generated JSON + Pull Request
            |
            v
Cloudflare Worker (/register)
            |
            v
Cloudflare D1 — Proposals
            |
            v
Telegram Bot
      |             |
   Approve        Reject
      |             |
      v             v
Security checks   Close PR
      |
      v
Merge approved PR
      |
      v
GitHub Actions — Deploy
      |
      v
GitHub Pages / React Portfolio
```

**Componentes tecnológicos:**

- Frontend: React 18, Vite y Tailwind CSS.
- Datos editoriales: `src/data/projects.js`.
- Datos generados: `src/data/generated/github-projects.json`.
- Automatización: GitHub Actions.
- Backend de aprobaciones: Cloudflare Workers.
- Persistencia: Cloudflare D1.
- Autenticación GitHub: GitHub App con JWT RS256 y tokens de instalación.
- Interfaz de aprobación: Telegram Bot API.
- Publicación: GitHub Pages.

## 3. Estado actual verificado

| Componente | Estado | Evidencia |
|---|---|---|
| Frontend React/Vite | Implementado previamente | Desarrollo local iniciado correctamente |
| Cloudflare Worker | Funcionando | `GET /health` responde `200 OK` |
| Base de datos D1 | Configurada | Migraciones aplicadas y tablas creadas |
| Bot de Telegram | Funcionando | `/start` y `/pending` responden |
| Webhook de Telegram | Configurado | Telegram confirmó el registro |
| GitHub App | Creada e instalada | Instalación identificada |
| Clave privada PKCS#8 | Válida localmente | `openssl pkey -check` confirmó validez |
| Secretos Cloudflare | Configurados | Wrangler confirmó las cargas |
| `/github-health` | Disponible | Se ejecuta y devuelve diagnóstico |
| Autenticación GitHub App | Funcionando | `/github-health` responde `200` con `ok:true` |
| Creación real de propuestas | No verificada de extremo a extremo | Pendiente |
| Aprobación y merge real | No verificados | Pendiente |

**Nota:** existen implementaciones iniciales de los endpoints y las validaciones, pero no deben considerarse completas ni seguras hasta probarlas.

## 4. Problema actual: GitHub App authentication failed: 404

### Evidencia

La solicitud:

```bash
curl -i \
  -H "Authorization: Bearer ${API_SECRET}" \
  "https://natalia-portfolio-approvals.nataliaapr08.workers.dev/github-health"
```

Devuelve:

```http
HTTP/2 502 Bad Gateway
```

```json
{
  "ok": false,
  "error": "GitHub authentication failed"
}
```

Los logs de Cloudflare muestran:

```text
GitHub health error:
GitHub App authentication failed: 404
```

### Diagnósticos anteriores

Durante la configuración se resolvieron otros problemas:

- `404 Not found` del Worker: inicialmente faltaba o no estaba desplegada la ruta `/github-health`.
- Error `atob() called with invalid base64-encoded data`: se detectó un problema al procesar la clave privada.
- La clave fue convertida a PKCS#8 y validada con OpenSSL.
- `401 Unauthorized` del Worker: la variable local `API_SECRET` estaba vacía.
- Se regeneró y actualizó `PROPOSAL_API_SECRET`, eliminando el error de autorización local.

**Conclusión actual:** la solicitud ya atraviesa la autenticación del Worker, pero falla al intentar obtener un token de instalación de GitHub.

### Datos relevantes

- Repositorio: `NataliaPerez08/natalia-portafolio`
- Cloudflare Worker: `natalia-portfolio-approvals`
- URL del Worker: `https://natalia-portfolio-approvals.nataliaapr08.workers.dev`
- GitHub App Installation ID vigente: `175310195` (el anterior `82635705` quedó huérfano tras una desinstalación)
- Archivo de backend: `telegram/src/github.js`
- Router del backend: `telegram/src/index.js`

### Hipótesis pendientes de comprobar

1. El secreto `GITHUB_APP_INSTALLATION_ID` todavía contiene un ID incorrecto.
2. `GITHUB_APP_ID` pertenece a otra aplicación.
3. La clave privada corresponde a una GitHub App distinta.
4. La aplicación no reconoce la instalación indicada.
5. Existe un problema de implementación en `installationToken()` o en la construcción de la solicitud.

**No asumir cuál hipótesis es correcta sin evidencia adicional.**

### Resolución (26 de octubre de 2026)

Diagnóstico con JWT generado a partir de la clave local (`github-app-pkcs8.pem`) y App ID `5473647`:

- `GET /app` → `200`: el JWT autentica `natalia-portfolio-approval-bot` (id `5473647`, owner `NataliaPerez08`). App ID y clave correctos.
- `GET /app/installations` → `200` con `[]`: **la app no estaba instalada en ninguna cuenta** (causa raíz).
- `GET /repos/NataliaPerez08/natalia-portafolio/installation` → `404`: sin instalación sobre el repo.

El `404` se debía a que la app fue desinstalada; el `GITHUB_APP_INSTALLATION_ID` apuntaba a una instalación inexistente. Tras reinstalar la app sobre `NataliaPerez08`, la instalación vigente es `175310195`.

**Acciones realizadas:**
- Se actualizó el secreto `GITHUB_APP_INSTALLATION_ID` a `175310195`.
- Se añadió el `body.message` de GitHub al error de `installationToken()` (`telegram/src/github.js`).
- Se desplegó el Worker y se verificó `POST /app/installations/175310195/access_tokens` → `201` y lectura del repo → `200`.

**Criterio de aceptación cumplido:** `/github-health` devuelve `200` con `{"ok":true,"repository":"NataliaPerez08/natalia-portafolio","authenticated":true}`.

---

## 5. Roadmap de implementación

### Fase 0 — Desbloquear la autenticación de GitHub

**Prioridad: P0 — Bloqueante**

**Objetivo:** conseguir una autenticación válida entre Cloudflare Worker y GitHub App.

**Tareas:**

- [x] Confirmar que el secreto `GITHUB_APP_INSTALLATION_ID` contiene `82635705`.
- [x] Verificar que `GITHUB_APP_ID` coincide con el App ID de GitHub Developer Settings.
- [x] Comprobar que la clave privada PKCS#8 pertenece a esa misma aplicación.
- [x] Inspeccionar `generateJWT()` e `installationToken()` en `telegram/src/github.js`.
- [x] Revisar la URL exacta utilizada para solicitar el token: `POST /app/installations/{installation_id}/access_tokens`.
- [x] Consultar `GET /app` usando el JWT para identificar la aplicación autenticada.
- [x] Consultar `GET /app/installations/82635705` para verificar la instalación.
- [x] Alternativamente, consultar `GET /repos/NataliaPerez08/natalia-portafolio/installation` con el JWT para descubrir la instalación reconocida.
- [x] Añadir logs sanitizados con etapa, código HTTP y mensaje de error, sin registrar JWT, tokens ni claves.
- [x] Corregir la configuración o el código según los resultados.
- [x] Repetir la prueba `/github-health`.

**Criterio de aceptación:**

```json
{
  "ok": true,
  "repository": "NataliaPerez08/natalia-portafolio",
  "authenticated": true
}
```

**Entregable:** autenticación GitHub App funcional y documentada.

### Fase 1 — Auditar y asegurar el flujo de aprobaciones

**Prioridad: P0 — Seguridad**

**Objetivo:** evitar que una aprobación de Telegram pueda fusionar cambios diferentes de los revisados.

**Tareas:**

- [x] Revisar `telegram/src/proposals.js`, `auth.js`, `github.js` e `index.js`.
- [x] Validar la autenticidad del webhook de Telegram mediante su encabezado secreto.
- [x] Verificar de forma estricta el Telegram User ID autorizado.
- [x] Comprobar que el Pull Request pertenece al repositorio esperado.
- [x] Exigir rama base `main` y rama origen interna autorizada.
- [x] Rechazar Pull Requests provenientes de forks.
- [x] Establecer una lista explícita de archivos generados que pueden modificarse.
- [x] Rechazar propuestas que modifiquen código ejecutable, workflows, secretos o configuración.
- [x] Sustituir `diff_digest: pr.head.sha` por una estrategia de integridad real: hash canónico del conjunto de cambios y almacenamiento del SHA revisado.
- [x] Revalidar el HEAD del PR, archivos y controles de integridad justo antes del merge.
- [x] Comprobar que el PR sigue aprobado, sin expirar ni haber sido procesado.
- [x] Validar los checks requeridos por identidad, conclusión y commit exacto, no solamente por nombre genérico.
- [x] Hacer idempotentes las decisiones y evitar dos aprobaciones concurrentes.
- [x] Registrar eventos de aprobación, rechazo, expiración y errores.
- [x] Garantizar que ninguna propuesta se fusione sin aprobación expresa.

**Criterio de aceptación:** cambios no autorizados, PR alterados después de su revisión, aprobaciones duplicadas y checks incorrectos son rechazados.

**Entregable:** flujo seguro de aprobación y merge.

**Nota de implementación (26 de octubre de 2026):** añadido `ALLOWED_PATHS`, `isAllowedChangeSet`, `diffDigest` (hash canónico SHA-256 del conjunto de cambios) y `checkPasses` (exige `app.id === 15368`, `head_sha === pr.head.sha`, conclusión `success`) en `github.js`. El `reject` ya no exige checks aprobados y cierra el PR. Tests en `telegram/src/github.test.mjs` (`node --test`). La expiración automática de propuestas (`status='expired'`) y el cron quedan diferidos a Fase 6. La protección de `main` (requerir check `test` + prohibir push directo) es configuración manual en GitHub, backstop que complementa la aprobación por Telegram.

### Fase 2 — Implementar el sincronizador de GitHub

**Prioridad: P1 — Funcionalidad central**

**Objetivo:** transformar la actividad pública de GitHub en datos estructurados para el portafolio.

**Tareas:**

- [x] Consultar repositorios públicos del perfil.
- [x] Detectar repositorios nuevos, actualizados, archivados y eliminados de la fuente pública.
- [x] Obtener descripción, URL, lenguajes, topics, fechas y estadísticas disponibles.
- [ ] Identificar repositorios de contribuciones open source, diferenciándolos de repositorios propios.
- [x] Normalizar nombres, URLs, tecnologías y fechas.
- [x] Evitar duplicados por ID de repositorio.
- [x] Implementar paginación y manejo de límites de GitHub API.
- [x] Generar datos deterministas en `src/data/generated/github-projects.json`.
- [x] Detectar diferencias antes de crear Pull Requests.
- [x] No crear propuestas si no existen cambios reales.
- [x] Conservar explícitamente el contenido editorial manual.
- [x] Crear un PR de sincronización por conjunto coherente de cambios.
- [x] Registrar la propuesta mediante el endpoint autenticado `/register`.

**Criterio de aceptación:** un repositorio nuevo produce una propuesta; una ejecución sin cambios no crea PR.

**Entregable:** sincronización reproducible de proyectos GitHub.

**Nota de implementación (26 de octubre de 2026):** `scripts/sync-github.mjs` endurecido: paginación de repos propios (`type=owner`), reintentos ante límite de tasa (`429`/`403` con `x-ratelimit-remaining: 0`, `retry-after`) y ante `5xx`, deduplicación por `id`, `topics` ordenados y salida determinista (verificada por hash idéntico en ejecuciones repetidas). Sincronización real: 36 repositorios. `npm run build` y `node --test` pasan. La detección de *contribuciones open source* a repos ajenos queda **diferida**: no existe endpoint REST limpio (requiere GraphQL `contributionsCollection`); se abordará con el modelo híbrido (Fase 3) o la fase de IA (Fase 5).

### Fase 3 — Diseñar el modelo editorial híbrido

**Prioridad: P1 — Calidad del portafolio**

**Objetivo:** separar claramente los datos obtenidos de GitHub y los datos curados manualmente.

**Modelo sugerido:**

```text
projects.js                 -> datos editoriales
github-projects.json        -> datos sincronizados
project-overrides.json      -> decisiones editoriales
project-adapter.js          -> modelo combinado
```

**Reglas de precedencia:**

1. La información editorial aprobada manualmente tiene prioridad.
2. GitHub actualiza campos objetivos, como actividad y metadatos técnicos.
3. El campo `featured` nunca cambia sin aprobación explícita.
4. Las descripciones generadas por IA son borradores.
5. El agente nunca inventa experiencia, tecnologías ni contribuciones.
6. Un proyecto desaparecido de GitHub no se elimina automáticamente del portafolio.
7. La procedencia de cada dato debe poder identificarse.

**Criterio de aceptación:** la sincronización no sobreescribe proyectos destacados ni descripciones personalizadas.

**Entregable:** adaptador de datos híbrido.

**Nota de implementación (26 de octubre de 2026):** el adaptador ya existía en `src/data/merge-projects.js` y se ajustó a este modelo. Mapeo real: `projects.catalog.js` = datos editoriales (incluye las decisiones de override: `featured`, `category`, `caseStudy`, `status`), `generated/github-projects.json` = datos sincronizados, `merge-projects.js` = adaptador combinado, `projects.js` = punto de entrada. No se creó `project-overrides.json` por separado: las decisiones editoriales ya viven en el catálogo (YAGNI). Añadido `source` (`editorial`/`github`) para la procedencia (regla 7) y conservado el subobjeto `github.*` para campos objetivos (regla 2). Las reglas 1, 3 y 6 quedan cubiertas por la precedencia de `...p` sobre `...r` y por el fallback que preserva proyectos sin match. Tests de precedencia/procedencia añadidos en `tests/merge-projects.test.mjs` (5 pasando).

### Fase 4 — Integrar el modelo con el frontend

**Prioridad: P1 — Presentación**

**Objetivo:** mostrar la información sincronizada en las páginas existentes.

**Tareas:**

- [x] Revisar `ProjectsPage.jsx`, `HomePage.jsx`, `ProjectDetailPage.jsx` y `ProjectCard.jsx`.
- [x] Integrar la salida del adaptador con los componentes existentes.
- [x] Mostrar repositorios nuevos únicamente cuando corresponda.
- [x] Diferenciar proyectos principales, contribuciones open source, experimentos y archivo.
- [x] Permitir ordenar por relevancia editorial o actividad.
- [x] Mostrar fecha de última actualización cuando aporte valor.
- [x] Evitar duplicados entre proyectos manuales y sincronizados.
- [x] Mantener compatibilidad con los datos actuales.
- [x] Validar comportamiento en móvil y escritorio.

**Criterio de aceptación:** el portafolio muestra proyectos sincronizados sin perder las entradas existentes.

**Entregable:** frontend integrado.

**Nota de implementación (26 de octubre de 2026):** `ProjectCard` ahora muestra metadatos sincronizados (`language`, `★ stars`, `updated YYYY-MM-DD`) y topics; marca `SYNCED` los repos de procedencia `github`. `ProjectDetailPage` añade el bloque `ACTIVITY` (lenguaje, estrellas, fecha). `ProjectsPage` añade toggle `Relevance`/`Activity` (ordena por `updatedAt` desc). La deduplicación manual/sincronizado ya la garantiza `mergeProjects` por `repositoryKey`. La diferenciación principales/OSS/experimentos/archivo sigue por páginas y fuentes separadas (`projects`, `contributions`, `experiments`, `archive`). Actualmente ningún repo lleva el topic `portfolio`, por lo que no aparecen repos nuevos auto-descubiertos hasta que se etiqueten (comportamiento esperado). `npm run build` pasa.

### Fase 5 — Mejorar el agente con generación asistida por IA

**Prioridad: P2 — Inteligencia editorial**

**Objetivo:** generar propuestas de contenido útiles sin publicar afirmaciones no verificadas.

**Tareas:**

- [ ] Analizar README, topics, estructura y archivos relevantes de cada repositorio.
- [ ] Proponer resúmenes breves para tarjetas.
- [ ] Proponer descripciones extendidas para páginas de proyecto.
- [ ] Inferir tecnologías únicamente cuando exista evidencia suficiente.
- [ ] Identificar proyectos potencialmente destacables sin alterar `featured` automáticamente.
- [ ] Explicar el motivo de cada modificación.
- [ ] Incluir enlaces a la evidencia consultada.
- [ ] Presentar el contenido anterior y el propuesto.
- [ ] Guardar las propuestas de IA como borradores revisables.
- [ ] Permitir aprobar, rechazar y, posteriormente, editar propuestas.

**Criterio de aceptación:** toda afirmación generada tiene evidencia trazable y requiere aprobación antes de publicarse.

**Entregable:** enriquecimiento editorial supervisado.

### Fase 6 — Automatización y observabilidad

**Prioridad: P2 — Operación**

**Objetivo:** ejecutar el sistema de forma recurrente, segura y mantenible.

**Tareas:**

- [x] Configurar ejecución programada mediante GitHub Actions.
- [x] Permitir ejecución manual con `workflow_dispatch`.
- [x] Gestionar autenticación GitHub App desde Actions.
- [x] Configurar el secreto compartido `PROPOSAL_API_SECRET` también en Actions.
- [x] Verificar reintentos seguros y manejo de fallas.
- [x] Expirar propuestas pendientes.
- [x] Evitar notificaciones duplicadas.
- [x] Registrar resultados sin exponer credenciales.
- [x] Implementar pruebas unitarias y de integración.
- [x] Verificar build y despliegue posterior a merges autorizados.
- [x] Documentar rotación de secretos y recuperación de incidentes.
- [x] Incorporar métricas de ejecuciones, propuestas, aprobaciones y errores.

**Criterio de aceptación:** el sistema ejecuta ciclos completos sin intervención manual, excepto las decisiones editoriales.

**Entregable:** pipeline automatizado con observabilidad.

**Nota de implementación (26 de octubre de 2026):**
- **Expiración:** añadido cron `0 0 * * *` en `wrangler.jsonc` + handler `scheduled` en `telegram/src/index.js` (`expirePending`) que marca `expired` las propuestas vencidas y registra el evento en `approval_events`.
- **Métricas:** nuevo endpoint `GET /stats` (gateado por `PROPOSAL_API_SECRET`) con conteos de propuestas por estado y eventos por tipo.
- **DRY de auth:** extraído `apiAuthorized()` en `auth.js`, reutilizado en `/register`, `/github-health` y `/stats`.
- **Reintentos/fallas:** reintentos ante límite de tasa ya en `sync-github.mjs`; añadido `timeout-minutes: 15` a los jobs de `portfolio-proposals.yml` y `portfolio-checks.yml`.
- **Autenticación en Actions:** el job de sincronización usa `secrets.GITHUB_TOKEN` (suficiente para leer repos públicos propios y crear PR); el merge lo ejecuta el Worker con el token de instalación de la GitHub App. No se usa la App directamente en Actions (innecesario para el alcance actual).
- **Acciones pendientes del operador (config, no código):** subir `PROPOSAL_API_SECRET`, `PORTFOLIO_APPROVAL_WORKER_URL` y las variables/secretos a GitHub, y commitear los workflows y `src/data/generated/` a `main`.

**Rotación de secretos y recuperación de incidentes:**
- **Clave privada expuesta** (`github-app-pkcs8.pem` / `*.pem`): revocar la clave en GitHub App → "Generate a new private key", convertir a PKCS#8 y actualizar el secreto `GITHUB_APP_PRIVATE_KEY` (`wrangler secret put`). Verificar con `/github-health`. Nunca commitear `*.pem` (ya en `.gitignore`).
- **`PROPOSAL_API_SECRET` rotado:** actualizarlo en Cloudflare (`wrangler secret put`) y en el secreto de GitHub Actions al mismo tiempo; un valor desincronizado rompe `/register`.
- **`GITHUB_APP_INSTALLATION_ID`:** si se desinstala/reinstala la app, el ID cambia; descubrir el nuevo con `GET /app/installations` (JWT) y actualizar el secreto. Ver `/github-health`.
- **Incidente (merge no deseado):** el merge es squash sobre `main`; `git revert` el commit, y auditar `approval_events` en D1 (`SELECT * FROM approval_events ORDER BY id DESC`) para reconstruir quién/ cuándo decidió.

---

## 6. Pruebas de extremo a extremo obligatorias

Antes de considerarlo terminado, ejecutar estos escenarios.

**Leyenda:** ✅ verificado en vivo · 🧪 cubierto por test automatizado · 🔒 impuesto por código/D1 (confirmar en el run en vivo) · ⏳ requiere el pipeline en vivo.

| # | Prueba | Resultado esperado | Estado |
|---|---|---|---|
| 1 | GitHub App autenticada | `/github-health` devuelve `200` | ✅ (Fase 0) |
| 2 | Nuevo repositorio público | Se genera un PR | ⏳ |
| 3 | Ejecución sin cambios | No se genera PR | ⏳ |
| 4 | Registro de PR | Se crea una propuesta en D1 | ⏳ |
| 5 | Notificación | Telegram presenta resumen y acciones | ⏳ |
| 6 | Aprobación autorizada | Se revalidan checks y contenido, luego se fusiona | ⏳ |
| 7 | Rechazo autorizado | Se registra rechazo y se cierra el PR | ⏳ |
| 8 | Usuario Telegram no autorizado | Se rechaza la operación | 🧪 (`auth.test.mjs`) |
| 9 | PR alterado tras aprobación | Se bloquea el merge | 🔒 (`verifyPR` compara `head.sha`/`base.sha` + `diffDigest`) |
| 10 | PR que modifica archivos prohibidos | Se rechaza | 🧪 (`isAllowedChangeSet`) |
| 11 | Propuesta expirada | No puede fusionarse | 🔒 (`claim` exige `status='pending' AND expires_at > now`) |
| 12 | Aprobación duplicada | No genera operaciones adicionales | 🔒 (`claim` UPDATE atómico) |
| 13 | Merge autorizado | GitHub Pages se reconstruye | ⏳ (`deploy.yml` en push a `main`) |
| 14 | Fallo de red o GitHub API | No se fusiona nada y se registra el error | 🔒 (`decide` try/catch → `finalize('failed')`) |

### Runbook para cerrar los escenarios en vivo (2–7, 13)

1. **Commit + push** de todo el trabajo local (`telegram/`, `.github/workflows/`, `scripts/`, `src/data/generated/`, `src/data/`, `tests/`, `ROADMAP.md`) a `main`. Confirmar que `*.pem` queda fuera (`git status` no debe listarlos).
2. **Secretos/variables de GitHub:** `PROPOSAL_API_SECRET` (mismo valor que en Cloudflare), `PORTFOLIO_APPROVAL_WORKER_URL` (`https://natalia-portfolio-approvals.nataliaapr08.workers.dev`). El token `GITHUB_TOKEN` ya está disponible en Actions.
3. **Ejecutar** `portfolio-proposals.yml` con `workflow_dispatch` (o esperar el cron).
4. **Observar:** si `src/data/generated/github-projects.json` no cambió → no se crea PR (escenario 3). Para forzar el escenario 2, crear/etiquetar un repo con el topic `portfolio` o cambiar la descripción de un repo propio.
5. **Telegram:** recibir la notificación, pulsar Aprobar/Rechazar. Verificar en D1 (`/stats`) y en GitHub el merge/cierre y el despliegue de Pages (escenario 13).

Los escenarios 🔒 quedan cubiertos por diseño; su confirmación definitiva se produce durante el run en vivo de los escenarios 6/7.

## 7. Prioridad de ejecución

| Orden | Fase | Prioridad | Dependencia |
|---|---|---|---|
| 1 | Autenticación GitHub App | P0 | Ninguna |
| 2 | Seguridad de aprobaciones | P0 | Autenticación |
| 3 | Sincronizador GitHub | P1 | Autenticación |
| 4 | Modelo editorial híbrido | P1 | Datos normalizados |
| 5 | Integración frontend | P1 | Modelo híbrido |
| 6 | Generación asistida por IA | P2 | Flujo seguro |
| 7 | Automatización y observabilidad | P2 | Flujo funcional |

**Primer MVP:** completar las fases 0 a 4, con una prueba de extremo a extremo que demuestre que un cambio de GitHub se convierte en propuesta, se aprueba en Telegram y se publica sin sobrescribir contenido editorial.

La generación asistida por IA puede incorporarse después.

---

## 8. Instrucciones para el agente que retome el desarrollo

Actúa como un ingeniero senior especializado en GitHub Apps, Cloudflare Workers, seguridad de sistemas automatizados, React y GitHub Actions.

Tu tarea es completar `portafolioAdapter` de forma incremental y verificable.

**Reglas de trabajo:**

1. Inspecciona primero el código existente; no reconstruyas componentes que ya funcionan.
2. Comienza diagnosticando el error `GitHub App authentication failed: 404`.
3. Verifica la coherencia de App ID, Installation ID y clave privada.
4. No asumas que la instalación `82635705` ya está guardada correctamente en Cloudflare.
5. No solicites, imprimas ni incorpores secretos en código, logs, commits o respuestas.
6. No modifiques la rama `main` directamente.
7. No habilites merges automáticos hasta finalizar las validaciones de seguridad.
8. Conserva el contenido editorial manual.
9. Trabaja mediante cambios pequeños, pruebas y Pull Requests.
10. Documenta cada modificación, su justificación y su resultado.
11. Antes de cada fase, identifica las dependencias y los riesgos.
12. Nunca declares una integración como funcional únicamente porque el código existe: exige una prueba real.

**Primer objetivo operativo:**

Resolver el `404` de GitHub App, obtener una respuesta `200 OK` en `/github-health` y comprobar que el Worker tiene acceso autorizado al repositorio `NataliaPerez08/natalia-portafolio`.

**Definición de terminado:**

El sistema detecta cambios verificables de GitHub, propone una modificación delimitada, la almacena en D1, solicita aprobación por Telegram, comprueba que el contenido aprobado no cambió, fusiona el PR autorizado y publica correctamente el portafolio; todas las pruebas de seguridad deben pasar.

---

## 9. Riesgos técnicos que no deben ignorarse

**Clave privada:** el archivo `github-app-pkcs8.pem` estuvo ubicado dentro del repositorio local. Confirmar que no se haya publicado ni preparado para un commit. Mantenerlo fuera del repositorio; si fue expuesto, revocar la clave afectada.

**Secretos sincronizados:** `PROPOSAL_API_SECRET` fue regenerado durante el diagnóstico. La copia de ese secreto en GitHub Actions, si existe, podría estar desactualizada.

**Integridad del PR:** el campo `diff_digest` actualmente reutiliza el SHA del HEAD. Esto requiere revisión antes de autorizar merges reales.

**Validación de checks:** comprobar únicamente un check denominado `test` es insuficiente si no se vincula inequívocamente al commit y flujo de trabajo esperado.

**Alcance funcional:** el flujo implementado inicialmente contempla un snapshot JSON de proyectos GitHub. Las actualizaciones editoriales, contribuciones y cambios de proyectos destacados todavía necesitan diseño e implementación verificables.

**Protección de `main`:** las aprobaciones de Telegram no deben sustituir las políticas de seguridad de GitHub; deben complementarlas.

**Conclusión:** la infraestructura base está operativa, pero el sistema aún no está listo para fusionar cambios automáticamente. La prioridad inmediata es resolver la autenticación de GitHub App y después fortalecer el flujo de aprobación antes de ampliar la sincronización.