---
type: current-state
status: draft
updated_at: 2026-10-02
generated_by: architecture-agent
template_version: 1
---

> Idioma del proyecto: **español**. Escribe este conocimiento en español. Mantén en inglés el código, los nombres de archivo, los comandos y las claves de configuración.

# Current State

> Línea base de arquitectura reconstruida desde el Kaddo Context Pack y el código disponible.
> Lo indicado como *(observado)* existe hoy; lo marcado como *(asumido)* es intención, todavía sin
> código.

## System Overview

`Sistema-produccion` es una aplicación de productividad que reúne tareas, mapas mentales,
calendario, chat y pomodoro en un solo lugar, con permisos por workspace. Está pensada para equipos
pequeños y para uso individual.

El diseño es de **frontend y backend separados** (multirepo): el frontend en React + TanStack Start
(modo SPA) y el backend en NestJS, con PostgreSQL. La API es la fuente de verdad y la autorización
vive enteramente en el backend *(asumido; el código de negocio todavía no existe)*.

Estado actual: **new**. Existe una **base de frontend** generada desde plantilla; no hay backend ni
modelo de datos.

## Modules

Backend (previsto, sin código todavía): `auth`, `users`, `workspaces`, `memberships`, `tasks`,
`mind-maps`, `calendar`, `chat`, `pomodoro`, `notifications`.

Frontend (observado en `system-app-productividad/`):

- `apps/web` — aplicación TanStack Start.
  - `src/router.tsx`, `src/routeTree.gen.ts` — enrutado generado por TanStack Router.
  - `src/routes/__root.tsx` — layout raíz.
  - `src/routes/index.tsx` — única ruta de ejemplo.
  - `vite.config.ts` — configuración de Vite.
  - `components.json` — configuración de shadcn/ui.
- `packages/ui` — paquete `@workspace/ui`.
  - `src/components/button.tsx` — único componente de ejemplo.
  - `src/lib/utils.ts`, `src/styles/globals.css`, `src/hooks/` (vacío).
- Raíz — `turbo.json`, `tsconfig.json`, `package.json` con workspaces npm `apps/*` y `packages/*`.

## Dependencies and Integrations

Frontend (observado):

- `react` 19, `react-dom` 19, `@tanstack/react-start`, `@tanstack/react-router`,
  `@tanstack/react-router-devtools`, `lucide-react`, `tailwindcss` v4, `@tailwindcss/vite`.
- Paquete interno `@workspace/ui` (`@base-ui/react`, `class-variance-authority`, `cn`, `shadcn`,
  `zod`, `tw-animate-css`).

Herramientas (observado): Turbo, Vite 8, TypeScript 6, ESLint, Prettier, npm workspaces.

Integraciones previstas (asumido, sin código): autenticación con Google, gateway de WebSockets para
el chat y almacenamiento externo de archivos (por decidir).

## Data Stores

- **PostgreSQL** *(asumido)* — base de datos principal. El ORM está pendiente de decisión
  (Prisma o Drizzle). No hay esquema ni migraciones todavía.
- **Almacenamiento de archivos** *(asumido, por decidir)* — imágenes de perfil, imágenes de tareas y
  adjuntos del chat (PDF/imagen).

## Cross-cutting Concerns

- **Autenticación:** sesión en cookie `httpOnly` *(asumido)*. Frontend y API comparten sitio o
  configuran CORS con origen explícito y credenciales.
- **Autorización:** guard global de autenticación y guard de roles por workspace, cerrado por
  defecto *(asumido)*.
- **Aislamiento por workspace:** todo recurso se consulta dentro de su workspace antes de comprobar
  el rol *(asumido)*.
- **Tiempo real:** WebSockets para chat y presencia, alojados en NestJS, porque Start no trae
  WebSockets integrados *(asumido)*.
- **Estándares:** TypeScript estricto, Conventional Commits, GitHub Flow + SemVer.

## Known Gaps

- **No existe backend:** ni proyecto NestJS, ni base de datos, ni migraciones, ni autenticación.
- **No existe modelo de datos** ni contratos de API.
- **El frontend es una plantilla:** una sola ruta de ejemplo y un solo componente; sin pantallas de
  producto.
- **Sin pruebas configuradas** en ninguno de los dos repositorios.
- **Sin integración continua** documentada.
- **Sin ownership declarado** (`code:` globs) en los artifacts.
- **Decisiones abiertas:** ORM, librería de autenticación y almacenamiento de archivos.

## Assumptions

- El frontend seguirá en TanStack Start modo SPA, sin server functions.
- El backend será un repositorio NestJS independiente.
- PostgreSQL es la base de datos elegida.

## Open Questions

- ¿Prisma o Drizzle?
- ¿Passport propio o una librería de autenticación para NestJS?
- ¿Qué servicio de almacenamiento de archivos?
- ¿Framework de pruebas del backend?
