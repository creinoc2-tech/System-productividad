---
type: chore
work_type: chore
id: WI-002
title: Configurar Vitest en el frontend
status: draft
created_at: "2026-10-02"
affected_modules:
  - core
knowledge_level: K2
initiative: RM-001
phase: now
source: roadmap
source_id: WI-CANDIDATE-002
source_initiative: RM-001
summary: >
  Configurar Vitest en el frontend con una primera prueba, para tener red de seguridad antes de
  construir las pantallas de producto.
---

# Configurar Vitest en el frontend

> Type: chore

## Actor

La persona que desarrolla el frontend.

## Outcome

Una infraestructura de pruebas en el frontend que se ejecuta con un comando y sirve de base para
las pruebas de componentes y de flujo.

## Current behavior

No hay pruebas ni framework de pruebas configurado en `system-app-productividad/`.

## Target behavior

- Vitest configurado en el monorepo (o en `apps/web`).
- Un script `test` disponible desde la raíz.
- Al menos una prueba de ejemplo que pasa.
- Convención de nombres y ubicación de pruebas documentada.

## Entry points

- `system-app-productividad/package.json` y `turbo.json`.
- `system-app-productividad/apps/web/vite.config.ts`.

## End-to-end flow

1. Instalar y configurar Vitest.
2. Añadir el script `test` y registrarlo en Turbo.
3. Escribir una prueba de ejemplo.
4. Ejecutar la suite y comprobar que pasa.

## Scope unknowns

- ¿Vitest con jsdom para pruebas de componentes o solo pruebas de lógica por ahora?

## Acceptance criteria

- [ ] `npm run test` ejecuta la suite y pasa.
- [ ] Existe al menos una prueba de ejemplo.
- [ ] La convención de pruebas queda documentada (por ejemplo `*.test.ts(x)`).

## Out of scope

- Pruebas end-to-end (Playwright/Cypress).
- Cobertura mínima obligatoria.

## How to test it

1. `npm run test` en `system-app-productividad/`: la suite debe pasar.
2. Romper a propósito la aserción de la prueba de ejemplo y confirmar que falla.

## Definition of Done

- Vitest integrado en los scripts del monorepo.
- Prueba de ejemplo verde y convención documentada.

## Learning

- Anotar la configuración mínima necesaria para pruebas de componentes.

## Assumptions and open questions

- Se asume Vitest como framework (coherente con Vite).
- Open question: ¿se añade jsdom ahora o en una historia posterior?
