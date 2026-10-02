---
type: chore
work_type: chore
id: WI-003
title: Inicializar el proyecto NestJS del backend
status: draft
created_at: "2026-10-02"
affected_modules:
  - core
knowledge_level: K2
initiative: RM-002
phase: now
source: roadmap
source_id: WI-CANDIDATE-003
source_initiative: RM-002
summary: >
  Crear el repositorio del backend en NestJS con TypeScript, lint, formato y configuración base,
  ya que ninguna capacidad protegida puede existir sin la API.
---

# Inicializar el proyecto NestJS del backend

> Type: chore

## Actor

La persona que desarrolla el backend.

## Outcome

Un servicio NestJS que arranca, compila y pasa lint y formato, listo para añadir módulos de dominio.

## Current behavior

No existe repositorio de backend. Toda la lógica y la autorización deben vivir en NestJS.

## Target behavior

- Repositorio independiente (multirepo) con NestJS + TypeScript.
- Scripts `start`, `build`, `lint`, `format`.
- TypeScript estricto.
- Configuración base leída desde variables de entorno con un archivo de ejemplo (`.env.example`),
  **sin** secretos reales.

## Entry points

- Repositorio del backend (nuevo).

## End-to-end flow

1. Crear el proyecto NestJS con TypeScript.
2. Configurar lint/formato y TypeScript estricto.
3. Añadir configuración de entorno y un endpoint de salud (`/health`).
4. Verificar arranque y compilación.

## Scope unknowns

- ¿Dónde vive el repositorio del backend y cómo se relaciona con el repo core?
- ¿Se usa un nombre de proyecto concreto?

## Acceptance criteria

- [ ] El servicio arranca en local.
- [ ] `build`, `lint` y `format` funcionan.
- [ ] Existe un endpoint de salud.
- [ ] La configuración sensible se lee de variables de entorno con `.env.example` (sin valores
      reales).

## Out of scope

- Base de datos, autenticación y módulos de dominio.
- Integración continua (se puede añadir en una historia aparte).

## How to test it

1. Instalar dependencias e iniciar el servicio.
2. Llamar al endpoint de salud y comprobar la respuesta correcta.
3. Ejecutar `build` y `lint` sin errores.

## Definition of Done

- Proyecto NestJS creado, arrancando y verificado en local.
- Endpoint de salud operativo.

## Learning

- Documentar la convención de módulos y nombres de archivo del backend.

## Assumptions and open questions

- Se asume un repositorio NestJS independiente.
- Open question: ¿se incluye el health check expuesto públicamente (sin sesión)?
