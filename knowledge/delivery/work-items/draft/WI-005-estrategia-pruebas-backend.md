---
type: chore
work_type: chore
id: WI-005
title: Estrategia de pruebas del backend
status: draft
created_at: "2026-10-02"
affected_modules:
  - core
knowledge_level: K2
initiative: RM-002
phase: now
source: roadmap
source_id: WI-CANDIDATE-005
source_initiative: RM-002
summary: >
  Definir y configurar las pruebas unitarias y de integración del backend, incluida la base para
  los tests de permisos obligatorios.
---

# Estrategia de pruebas del backend

> Type: chore

## Actor

La persona que desarrolla el backend.

## Outcome

Una base de pruebas que permita exigir tests de permisos en cada funcionalidad protegida.

## Current behavior

No hay pruebas configuradas en el backend.

## Target behavior

- Framework de pruebas elegido y configurado (unitarias e integración).
- Scripts `test` y `test:e2e` (o equivalentes).
- Utilidades para crear una base de datos de pruebas y simular una sesión autenticada.
- Una prueba de ejemplo verde.

## Entry points

- Repositorio del backend (`WI-003`).

## End-to-end flow

1. Elegir y configurar el framework de pruebas.
2. Añadir utilidades de base de datos de pruebas y de sesión.
3. Escribir una prueba de ejemplo (unitaria y de integración).
4. Ejecutar la suite.

## Scope unknowns

- ¿Jest (por defecto en NestJS) o Vitest?
- ¿La base de datos de pruebas es efímera por suite o compartida?

## Acceptance criteria

- [ ] `test` ejecuta las pruebas unitarias y pasa.
- [ ] Existe al menos una prueba de integración con base de datos.
- [ ] Hay una utilidad para autenticar una petición en pruebas.
- [ ] La estrategia queda documentada en `knowledge/tech/`.

## Out of scope

- Pruebas de permisos concretas (llegan con cada funcionalidad).

## How to test it

1. Ejecutar los scripts de pruebas y comprobar que pasan.
2. Romper una aserción y confirmar que la suite falla.

## Definition of Done

- Suite configurada, utilidades listas y estrategia documentada.

## Learning

- Documentar cómo autenticar peticiones y aislar datos entre pruebas.

## Assumptions and open questions

- Se asume que habrá base de datos de pruebas.
- Open question: ¿Jest o Vitest?
