---
type: codebase
status: draft
generated_by: codebase-agent
template_version: 1
---

> Idioma del proyecto: **español**. Escribe este conocimiento en español. Mantén en inglés el código, los nombres de archivo, los comandos y las claves de configuración.

# Codebase

> Fundación intencionada del código: estructura, límites y convenciones. Describe la base del
> sistema, **no** genera código de producción.

## Repository Structure

El proyecto es **multirepo**: cada repositorio tiene su propio historial, su integración continua y
su despliegue. No hay paquete de código compartido; **la API es la fuente de verdad** y el frontend
consume su contrato.

- **core (este repositorio)** — capa de conocimiento Kaddo (`knowledge/`, `.kaddo/`) y coordinación.
  No contiene lógica de negocio.
- **frontend** — aplicación React + TanStack Start en modo SPA. En el estado actual vive bajo
  `system-app-productividad/` como monorepo Turbo con npm workspaces:
  - `apps/web` — aplicación TanStack Start (rutas, `router.tsx`, `routes/`).
  - `packages/ui` — componentes compartidos (`@workspace/ui`), estilos y utilidades.
- **backend** — aplicación NestJS (aún no iniciada). Repositorio independiente. Estructura prevista
  por módulos de dominio (ver *Initial Modules*).

## Candidate Stack

Frontend (ya presente en `system-app-productividad/`):

- React 19 + TypeScript 6.
- TanStack Start en **modo SPA** (sin server functions ni SSR del área privada).
- TanStack Router (`@tanstack/react-router`).
- Tailwind CSS v4 + shadcn/ui (`@base-ui/react`, `class-variance-authority`).
- Vite 8 + Turbo + npm workspaces (`npm@10.8.2`, Node `>=22.12.0`).

Backend (previsto):

- NestJS + TypeScript.
- PostgreSQL como base de datos; ORM **pendiente de decisión** (Prisma o Drizzle) → candidato ADR.
- Sesión en cookie `httpOnly`; autenticación por correo/contraseña y Google.
- Gateway de WebSockets para el chat y la presencia (Fase 4).
- Almacenamiento de archivos **pendiente de decisión** (imágenes de perfil, imágenes de tareas,
  adjuntos del chat).

Pruebas:

- Frontend: Vitest (a configurar).
- Backend: pruebas unitarias y de integración (framework pendiente); el objetivo es que ninguna
  funcionalidad se cierre sin sus tests de permisos.

## Quality Attributes

Priorizados (no todos "high"):

1. **Seguridad y autorización** — guard global de autenticación + guard de roles por workspace,
   cerrado por defecto. Ningún endpoint entrega datos sin sesión válida salvo los públicos marcados.
2. **Testabilidad de permisos** — cada regla de permiso tiene tests: sin sesión, sin membresía, con
   rol insuficiente y con recurso de otro workspace.
3. **Mantenibilidad** — TypeScript estricto, módulos por dominio y límites claros entre frontend y
   backend.
4. **Rendimiento básico** — listas (tareas, mensajes) paginadas; no cargar todo el historial.
5. **Claridad de contrato** — el frontend no reimplementa reglas; consume la API.

## Development Standards

- **Conventional Commits** y **GitHub Flow + SemVer**. Ver la estrategia de Git del proyecto.
- **TypeScript estricto** en backend y frontend; sin `any` sin justificar.
- **Sin lógica de negocio ni autorización en el frontend.** Toda la autorización vive en NestJS.
- **Identidad siempre desde la sesión:** el `userId` nunca se acepta desde la URL ni el cuerpo.
- **Todo recurso se consulta dentro de su workspace** antes de comprobar el rol.
- **Errores con códigos HTTP correctos** (400, 401, 403, 404, 409).
- **Las respuestas nunca incluyen datos secretos** (por ejemplo el hash de la contraseña).
- **Formato y lint automatizados** (`prettier`, `eslint`) vía scripts de Turbo.

## Git Strategy

GitHub Flow + Conventional Commits + SemVer (por defecto). Ver la estrategia del proyecto.

## Initial Modules

Backend (bounded contexts):

- `auth` — registro, inicio de sesión, sesión en cookie `httpOnly`.
- `users` — perfil y cuenta.
- `workspaces` — creación, edición y borrado.
- `memberships` — suscripciones, roles e invitaciones por código.
- `tasks` — tareas, etiquetas, fechas y asignados.
- `mind-maps` — mapas mentales (Fase 2).
- `calendar` — vistas por fecha (Fase 2).
- `chat` — conversación del workspace y WebSockets (Fase 4).
- `pomodoro` — configuración por cuenta (Fase 3).
- `notifications` — avisos y estado visto/clic (Fase 3).

Frontend (rutas / áreas):

- `auth` (login/registro), `onboarding`, `workspaces`, `tasks`, `mind-maps`, `calendar`, `chat`,
  `pomodoro`, `settings`.

## Assumptions

- El backend será NestJS + PostgreSQL; el ORM y la librería de autenticación están por decidir.
- El chat usará un gateway de WebSockets en el repositorio del backend.
- El frontend mantiene TanStack Start en modo SPA, sin server functions.

## Open Questions

- ¿Prisma o Drizzle?
- ¿Passport propio o una librería de autenticación compatible con NestJS?
- ¿Qué servicio se usará para almacenar archivos?
- ¿Framework de pruebas del backend?

## Quality checklist

- [x] Structure follows business and product, not a framework default.
- [x] No production code is described here — only the foundation.
