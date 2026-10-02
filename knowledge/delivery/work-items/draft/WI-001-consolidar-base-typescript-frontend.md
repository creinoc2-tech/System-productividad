---
type: chore
work_type: chore
id: WI-001
title: Consolidar la base TypeScript del frontend
status: draft
created_at: "2026-10-02"
affected_modules:
  - core
knowledge_level: K2
initiative: RM-001
phase: now
source: roadmap
source_id: WI-CANDIDATE-001
source_initiative: RM-001
summary: >
  Dejar el frontend en system-app-productividad/ arrancando, compilando, con typecheck, lint y
  formato reproducibles, antes de añadir pantallas de producto.
---

# Consolidar la base TypeScript del frontend

> Type: chore

## Actor

La persona que desarrolla el frontend.

## Outcome

Un frontend que arranca y pasa `dev`, `build`, `typecheck`, `lint` y `format` de forma reproducible,
para construir encima sin fricción.

## Current behavior

El repositorio `system-app-productividad/` es la plantilla de TanStack Start + shadcn/ui (monorepo
Turbo con `apps/web` y `packages/ui`). Tiene una sola ruta de ejemplo y un solo componente; la base
de calidad no se ha verificado como conjunto.

## Target behavior

- `npm run dev`, `npm run build`, `npm run typecheck`, `npm run lint` y `npm run format` funcionan
  desde la raíz.
- TypeScript en modo estricto, sin errores.
- Configuración de entorno documentada (Node `>=22.12.0`, `npm@10.8.2`).
- Rutas y componentes de ejemplo coherentes con el estilo del proyecto.

## Entry points

- `system-app-productividad/package.json` (scripts y workspaces).
- `system-app-productividad/apps/web` y `system-app-productividad/packages/ui`.

## End-to-end flow

1. Instalar dependencias en la raíz del monorepo.
2. Ejecutar `typecheck`, `lint` y `build`.
3. Corregir cualquier error de configuración o de tipos.
4. Verificar que `dev` levanta la ruta de ejemplo.

## Scope unknowns

- ¿Se fija la versión de Node con `.nvmrc` además de `engines`?

## Acceptance criteria

- [ ] `npm run typecheck` termina sin errores.
- [ ] `npm run lint` termina sin errores.
- [ ] `npm run build` genera la salida del frontend.
- [ ] `npm run dev` levanta la aplicación en el puerto configurado.
- [ ] La versión de Node y el gestor de paquetes quedan documentados.

## Out of scope

- Pantallas de producto (login, workspaces, tareas).
- Integración con la API.

## How to test it

1. `npm install` en `system-app-productividad/`.
2. `npm run typecheck` y `npm run lint`: deben terminar sin errores.
3. `npm run build`: debe completar correctamente.
4. `npm run dev` y abrir la ruta de ejemplo en el navegador.

## Definition of Done

- Scripts de la raíz verificados y documentados.
- Sin errores de tipos ni de lint.
- Base lista para crear la primera ruta de producto.

## Learning

- Registrar cualquier ajuste de la plantilla que deba seguirse en futuras rutas.

## Assumptions and open questions

- Se asume que la plantilla actual es la base correcta (TanStack Start modo SPA).
- Open question: ¿se añade `.nvmrc`?
