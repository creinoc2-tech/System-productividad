---
type: feature
work_type: feature
id: WI-010
title: Invitaciones por enlace con cuatro códigos de rol
status: draft
created_at: "2026-10-02"
affected_modules:
  - core
knowledge_level: K3
initiative: RM-004
phase: now
source: roadmap
source_id: WI-CANDIDATE-010
source_initiative: RM-004
summary: >
  Permitir entrar a un workspace mediante un enlace de invitación, donde el código usado determina
  el rol inicial de la persona (general, admin, edición o solo lectura).
---

# Invitaciones por enlace con cuatro códigos de rol

> Type: feature

## Actor

Una persona que pertenece a un workspace y quiere invitar a otra.

## Outcome

Que una persona nueva entre al workspace con el rol que corresponda al enlace usado.

## Current behavior

No hay invitaciones; solo el `OWNER` creado en el onboarding.

## Target behavior

- Un workspace tiene cuatro códigos de invitación: general, admin, edición y solo lectura.
- Entrar con un código crea una membresía con el rol inicial correspondiente.
- El rol por defecto de una membresía es `READ_ONLY`.
- `READ_ONLY` no modifica contenido; `CAN_EDIT` y `READ_ONLY` no gestionan miembros.

## Entry points

- Frontend: aceptar invitación.
- Backend: `memberships` y generación/validación de códigos.

## End-to-end flow

1. Un miembro autorizado comparte un enlace con uno de los cuatro códigos.
2. La persona abre el enlace, inicia sesión (o se registra) y acepta.
3. El backend valida el código y crea la membresía con el rol correspondiente.
4. La persona entra al workspace con ese rol.

## Scope unknowns

- ¿Los códigos son por workspace y rotables?
- ¿Un código admin permite invitar a `ADMIN` sin restricción?

## Acceptance criteria

- [ ] Cada uno de los cuatro códigos crea la membresía con el rol correcto.
- [ ] Un código inválido no crea membresía.
- [ ] Un `READ_ONLY` es rechazado al intentar modificar contenido.
- [ ] `CAN_EDIT` y `READ_ONLY` no pueden gestionar miembros (403).
- [ ] Existen pruebas de los cuatro roles y del código inválido.

## Out of scope

- Invitaciones por correo electrónico.
- Permisos más finos que el rol de workspace.

## How to test it

1. Generar los cuatro códigos.
2. Entrar con cada uno desde una cuenta distinta y comprobar el rol resultante.
3. Intentar modificar contenido con `READ_ONLY` (403) y gestionar miembros con `CAN_EDIT` (403).
4. Probar un código inválido.

## Definition of Done

- Invitaciones por enlace con los cuatro roles y pruebas de permisos.
- Pruebas verdes.

## Learning

- Anotar la relación entre código y rol inicial.

## Assumptions and open questions

- Se asume que los códigos se generan por workspace.
- Open question: ¿se pueden rotar o desactivar los códigos?
