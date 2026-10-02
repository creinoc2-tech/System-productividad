---
type: chore
work_type: chore
id: WI-004
title: Configurar PostgreSQL y el ORM
status: draft
created_at: "2026-10-02"
affected_modules:
  - core
knowledge_level: K3
initiative: RM-002
phase: now
source: roadmap
source_id: WI-CANDIDATE-004
source_initiative: RM-002
summary: >
  Conectar el backend a PostgreSQL con migraciones reproducibles en local, tras decidir el ORM
  (Prisma o Drizzle) mediante un ADR.
---

# Configurar PostgreSQL y el ORM

> Type: chore

## Actor

La persona que desarrolla el backend.

## Outcome

Una conexión a PostgreSQL con un esquema inicial y migraciones reproducibles, base del modelo de
datos del producto.

## Current behavior

No hay base de datos ni ORM. La decisión entre Prisma y Drizzle está pendiente.

## Target behavior

- ADR que decide el ORM (Prisma o Drizzle).
- Conexión a PostgreSQL configurada por variables de entorno.
- Una migración inicial reproducible en local, incluida la de una entidad mínima (por ejemplo
  `users`).
- Scripts para migrar y reiniciar la base de datos de desarrollo.

## Entry points

- Repositorio del backend (`WI-003`).
- `knowledge/tech/decisions/` para el ADR del ORM.

## End-to-end flow

1. Escribir el ADR comparando Prisma y Drizzle.
2. Configurar el ORM elegido y la cadena de conexión.
3. Crear la migración inicial.
4. Verificar aplicar y revertir la migración en local.

## Scope unknowns

- ¿Prisma o Drizzle?
- ¿Se usa una base de datos de desarrollo en contenedor o una instancia local?

## Acceptance criteria

- [ ] Existe un ADR aceptado que elige el ORM.
- [ ] La cadena de conexión sale de variables de entorno.
- [ ] La migración inicial se aplica y se revierte sin error.
- [ ] Un script levanta/reinicia la base de datos de desarrollo.

## Out of scope

- Modelo de datos completo (tareas, workspaces, etc.).
- Despliegue de base de datos en producción.

## How to test it

1. Levantar PostgreSQL local.
2. Ejecutar la migración y comprobar que crea el esquema.
3. Revertir la migración y comprobar que el esquema se elimina.
4. Arrancar el backend y confirmar que conecta sin errores.

## Definition of Done

- ORM decidido en un ADR y conectado.
- Migración inicial reproducible en local.

## Learning

- Registrar la convención de nombres de migraciones y modelos.

## Assumptions and open questions

- Se asume PostgreSQL.
- Open question: ¿contenedor (Docker) o instalación local para desarrollo?
