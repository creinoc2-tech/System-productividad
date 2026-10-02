---
type: feature
work_type: feature
id: WI-006
title: Registro e inicio de sesión con correo y contraseña
status: draft
created_at: "2026-10-02"
affected_modules:
  - core
knowledge_level: K3
initiative: RM-003
phase: now
source: roadmap
source_id: WI-CANDIDATE-006
source_initiative: RM-003
summary: >
  Permitir crear una cuenta y autenticarse con correo y contraseña, devolviendo una sesión válida
  sin exponer nunca el hash de la contraseña.
---

# Registro e inicio de sesión con correo y contraseña

> Type: feature

## Actor

Una persona que quiere usar la aplicación.

## Outcome

Poder registrarse y volver a entrar con su correo y contraseña, obteniendo una sesión válida.

## Current behavior

No existe identidad ni sesión: no hay backend ni pantallas de autenticación.

## Target behavior

- Registro con correo y contraseña (contraseña almacenada con hash).
- Inicio y cierre de sesión.
- Validación de datos de entrada y errores con códigos HTTP correctos (400, 401, 409).
- Ninguna respuesta incluye el hash de la contraseña.

## Entry points

- Endpoints de autenticación en NestJS.
- Pantalla de login/registro en el frontend.

## End-to-end flow

1. La persona envía correo y contraseña al endpoint de registro.
2. El backend valida, hashea la contraseña y crea la cuenta.
3. El backend crea la sesión.
4. En el login, el backend verifica la contraseña y crea la sesión.
5. El frontend guarda el estado de sesión a partir de la cookie `httpOnly`.

## Scope unknowns

- ¿Librería de autenticación o implementación propia?
- ¿Requisitos mínimos de contraseña?

## Acceptance criteria

- [ ] Registro crea la cuenta y una sesión válida.
- [ ] Login con credenciales correctas crea la sesión.
- [ ] Login con credenciales incorrectas responde 401.
- [ ] Correo duplicado responde 409.
- [ ] La respuesta nunca incluye el hash de la contraseña.
- [ ] Existen pruebas de los casos anteriores.

## Out of scope

- Inicio de sesión con Google (historia aparte).
- Recuperación de contraseña.
- Inicio de sesión con Apple.

## How to test it

1. Registrar una cuenta nueva y comprobar que se crea la sesión.
2. Intentar registrar el mismo correo y esperar 409.
3. Iniciar sesión con contraseña incorrecta y esperar 401.
4. Inspeccionar la respuesta y confirmar que no incluye el hash.
5. Ejecutar las pruebas automatizadas de autenticación.

## Definition of Done

- Registro y login funcionando de punta a punta.
- Errores con códigos correctos.
- Pruebas verdes.

## Learning

- Anotar el formato de la sesión y el tratamiento de errores.

## Assumptions and open questions

- Se asume autenticación por credenciales propias.
- Open question: ¿se exige verificación de correo en la Fase 1?
