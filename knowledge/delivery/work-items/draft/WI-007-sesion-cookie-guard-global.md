---
type: feature
work_type: feature
id: WI-007
title: Sesión en cookie httpOnly y guard global de autenticación
status: draft
created_at: "2026-10-02"
affected_modules:
  - core
knowledge_level: K3
initiative: RM-003
phase: now
source: roadmap
source_id: WI-CANDIDATE-007
source_initiative: RM-003
summary: >
  Transportar la sesión en cookie httpOnly y proteger todos los endpoints por defecto, de modo que
  ninguno entregue datos sin sesión válida salvo los públicos marcados.
---

# Sesión en cookie httpOnly y guard global de autenticación

> Type: feature

## Actor

Cualquier persona que use el sistema, así como quien lo mantiene y espera seguridad por defecto.

## Outcome

Que la identidad viaje en una cookie `httpOnly` y que el backend rechace por defecto cualquier
petición sin sesión válida.

## Current behavior

No existe sesión ni protección de endpoints.

## Target behavior

- La sesión se transporta en una cookie `httpOnly`.
- Guard global de autenticación que protege todo por defecto.
- Rutas públicas (por ejemplo login, registro, salud) marcadas explícitamente.
- La identidad se obtiene siempre de la sesión, nunca de la URL ni del cuerpo.
- CORS configurado con origen explícito y credenciales si frontend y API no comparten sitio.

## Entry points

- Backend (guards y configuración de sesión).
- Frontend (consumo de la API con credenciales).

## End-to-end flow

1. Tras el login, el backend emite la cookie `httpOnly`.
2. El navegador la envía en cada petición al mismo sitio.
3. El guard global valida la sesión antes de entrar al controlador.
4. Las rutas públicas se marcan como exentas de forma explícita.

## Scope unknowns

- ¿Frontend y API comparten sitio o se configura CORS?

## Acceptance criteria

- [ ] Un endpoint protegido sin cookie responde 401.
- [ ] Con cookie válida responde 200.
- [ ] Las rutas públicas funcionan sin sesión.
- [ ] El `userId` nunca se lee de la URL ni del cuerpo.
- [ ] Existen pruebas de acceso con y sin sesión.

## Out of scope

- Roles por workspace (historia aparte).
- Renovación/expiración avanzada de sesión.

## How to test it

1. Llamar a un endpoint protegido sin cookie y esperar 401.
2. Iniciar sesión y repetir la llamada con la cookie y esperar 200.
3. Llamar a una ruta pública sin cookie y esperar respuesta correcta.
4. Ejecutar las pruebas automatizadas de sesión.

## Definition of Done

- Guard global activo y rutas públicas explícitas.
- Pruebas verdes.

## Learning

- Documentar cómo se marcan las rutas públicas.

## Assumptions and open questions

- Se asume cookie `httpOnly` para la sesión.
- Open question: ¿duración y renovación de la sesión?
