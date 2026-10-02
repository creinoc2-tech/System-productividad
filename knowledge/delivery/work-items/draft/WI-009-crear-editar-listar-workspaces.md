---
type: feature
work_type: feature
id: WI-009
title: Crear, editar y listar workspaces
status: draft
created_at: "2026-10-02"
affected_modules:
  - core
knowledge_level: K3
initiative: RM-004
phase: now
source: roadmap
source_id: WI-CANDIDATE-009
source_initiative: RM-004
summary: >
  Permitir crear, editar y listar workspaces propios, y borrarlos solo tras escribir su nombre como
  confirmación.
---

# Crear, editar y listar workspaces

> Type: feature

## Actor

Una persona que organiza su trabajo, sola o con un equipo.

## Outcome

Crear y gestionar sus espacios de trabajo y ver solo aquellos a los que pertenece.

## Current behavior

Solo existe el workspace creado desde el onboarding, sin gestión.

## Target behavior

- Crear workspaces adicionales.
- Editar el nombre de un workspace.
- Listar los workspaces a los que pertenece la persona.
- Borrar un workspace escribiendo su nombre como confirmación.

## Entry points

- Frontend: listado y detalle de workspaces.
- Backend: endpoints de `workspaces`.

## End-to-end flow

1. La persona crea un workspace y queda como `OWNER`.
2. El listado muestra solo sus workspaces.
3. Editarlo cambia su nombre.
4. Borrarlo exige escribir el nombre exacto.

## Scope unknowns

- ¿Puede un `ADMIN` borrar el workspace o solo el `OWNER`?

## Acceptance criteria

- [ ] Crear un workspace lo añade al listado de la persona.
- [ ] El listado no muestra workspaces ajenos.
- [ ] Editar el nombre persiste el cambio.
- [ ] Borrar exige escribir el nombre; con un nombre incorrecto no borra.
- [ ] Existen pruebas de acceso a workspaces ajenos (403/404).

## Out of scope

- Invitar miembros (historia aparte).
- Transferir la propiedad.

## How to test it

1. Crear un workspace y comprobar que aparece en el listado.
2. Con otra cuenta, comprobar que no aparece.
3. Editar el nombre y recargar.
4. Intentar borrar con un nombre incorrecto (debe fallar) y con el correcto (debe borrar).

## Definition of Done

- CRUD básico de workspaces con aislamiento entre cuentas.
- Pruebas verdes.

## Learning

- Anotar la regla de confirmación de borrado.

## Assumptions and open questions

- Se asume que el creador queda como `OWNER`.
- Open question: ¿puede un `ADMIN` borrar el workspace?
