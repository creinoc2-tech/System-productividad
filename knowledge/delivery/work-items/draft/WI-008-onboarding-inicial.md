---
type: feature
work_type: feature
id: WI-008
title: Onboarding inicial (nombre, tipo de uso y primer workspace)
status: draft
created_at: "2026-10-02"
affected_modules:
  - core
knowledge_level: K2
initiative: RM-003
phase: now
source: roadmap
source_id: WI-CANDIDATE-008
source_initiative: RM-003
summary: >
  Guiar a una persona nueva para que, en pocos pasos, indique su nombre, su tipo de uso y cree su
  primer workspace.
---

# Onboarding inicial (nombre, tipo de uso y primer workspace)

> Type: feature

## Actor

Una persona que acaba de registrarse.

## Outcome

Llegar a un workspace listo para usar en pocos pasos.

## Current behavior

Tras el registro no hay ningún flujo de bienvenida ni forma de crear un workspace.

## Target behavior

- Paso de nombre (opcional si ya se recogió en el registro).
- Selección del tipo de uso: trabajo, estudio o personal.
- Creación del primer workspace.
- Al terminar, la persona queda dentro de su workspace.

## Entry points

- Frontend: ruta de onboarding.
- Backend: endpoint para crear el workspace inicial.

## End-to-end flow

1. Tras el registro, se redirige al onboarding.
2. La persona confirma su nombre y su tipo de uso.
3. Se crea el primer workspace y la membresía con rol `OWNER`.
4. La persona entra al workspace.

## Scope unknowns

- ¿El tipo de uso cambia algo del comportamiento o es solo una preferencia almacenada?

## Acceptance criteria

- [ ] Una persona nueva completa el onboarding sin intervención manual.
- [ ] Se crea el primer workspace con la persona como `OWNER`.
- [ ] El tipo de uso se almacena y se puede consultar.
- [ ] Existen pruebas del flujo completo.

## Out of scope

- Invitaciones a otras personas.
- Configuración avanzada del workspace.

## How to test it

1. Registrar una cuenta nueva.
2. Completar el onboarding y confirmar que se entra al workspace creado.
3. Consultar que el tipo de uso quedó guardado.

## Definition of Done

- Flujo de onboarding de punta a punta.
- Primer workspace creado con rol `OWNER`.

## Learning

- Anotar los valores válidos del tipo de uso.

## Assumptions and open questions

- Se asume que el onboarding siempre crea el primer workspace.
- Open question: ¿se puede omitir el onboarding y crearlo más tarde?
