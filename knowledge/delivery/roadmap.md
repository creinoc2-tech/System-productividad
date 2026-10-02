---
type: roadmap
id: roadmap
status: draft
generated_by: roadmap-agent
template_version: 1
knowledge_level: K3
---

# Roadmap

Generado con Kaddo Roadmap Agent. Las iniciativas y los work items de abajo son **candidatos**
para revisión humana, no compromisos finales.

> Idioma del proyecto: **español**. Se mantienen en inglés el código, los nombres de archivo, los
> comandos y las claves de configuración.

## Summary

`Sistema-produccion` es una aplicación de productividad que reúne **tareas, mapas mentales,
calendario, chat y pomodoro** en un solo lugar, para equipos pequeños y para personas que trabajan
solas. El alcance se entrega por fases (ver `knowledge/product/product.md`), con la seguridad y los
permisos por workspace como restricción de diseño cerrada por defecto.

El proyecto está en estado **new**: la base técnica del backend todavía no existe y el frontend
(TanStack Start + shadcn/ui) apenas arranca. Por eso el roadmap prioriza la **fundación técnica**
como `chore`, antes de las capacidades de usuario.

Repositorios (multirepo):

- **frontend** — React + TanStack Start en modo SPA. Ya iniciado bajo `system-app-productividad/`.
- **backend** — NestJS + PostgreSQL. Aún no iniciado.
- **core (workspace Kaddo)** — conocimiento y trazabilidad (este repositorio).

## Assumptions

Estas hipótesis vienen de `knowledge/business/business.md` y `knowledge/product/product.md` y se
asumen para desbloquear el roadmap (readiness gate). Quedan como supuestos a confirmar por el
dueño:

- El objetivo es **aprender NestJS y construir un proyecto de portafolio**, no lanzar un producto
  comercial a corto plazo.
- El usuario principal prioritario puede ser un **equipo pequeño**; el mismo producto debe servir a
  uso individual.
- La **Fase 1** (cuenta, workspaces con roles e invitaciones, tareas) ya demuestra el valor sin el
  resto.
- Cuatro roles (`OWNER`, `ADMIN`, `CAN_EDIT`, `READ_ONLY`) bastan; no se necesitan permisos por
  tarea.
- El **ORM** (Prisma o Drizzle) y la **estrategia de autenticación** se deciden durante la
  fundación del backend (candidatos ADR).
- No se incluye inicio de sesión con Apple en la primera versión.
- El chat puede resolverse con un **gateway de WebSockets** en el backend en la Fase 4.

## Roadmap Principles

- **Fundación como `chore`:** el primer trabajo es habilitación técnica, no capacidades de usuario.
- **Vertical slices por fase:** cada fase funciona de punta a punta y trae sus tests de permisos.
- **Seguridad cerrada por defecto:** guard global de autenticación + guard de roles por workspace.
- **Sin lógica de negocio en el frontend:** toda la autorización vive en NestJS.
- **Candidatos, no compromisos:** este roadmap se materializa con `kaddo create --from roadmap`.
- **Priorizar lo pequeño y verificable:** work items que quepan en una sesión de trabajo.

## Initiatives

### RM-001: Fundamentos del frontend

**Goal:** dejar la base del frontend lista para construir capacidades: TypeScript estricto, lint,
formato y pruebas.

**Related capabilities:** (transversal) desarrollo y calidad.

**Project area / domain:** frontend.

**Impact:** Medium

**Risk:** Low

**Suggested Knowledge Level:** K2

**Dependencies:** ninguna.

**Why this comes now:** el frontend ya está iniciado bajo `system-app-productividad/` (TanStack
Start + shadcn/ui, monorepo con Turbo). Falta cerrar la base de calidad antes de añadir pantallas.

**Candidate Work Items:**

- WI-CANDIDATE-001: Consolidar la base TypeScript del frontend (TanStack Start + shadcn/ui)
  - type: chore
  - suggested knowledge level: K2
  - expected value: un repositorio que arranca, compila y pasa lint/formato de forma reproducible.
  - notes: revisar scripts `dev`, `build`, `typecheck`, `lint` del monorepo Turbo.
- WI-CANDIDATE-002: Configurar Vitest y una primera prueba en el frontend
  - type: chore
  - suggested knowledge level: K2
  - expected value: red de seguridad para el código de interfaz y base para pruebas de permisos.
  - notes: definir convención de nombres y ubicación de pruebas.

**Open questions:**

- ¿Se fija una versión de Node y de gestor de paquetes (npm, ya declarado en `packageManager`) en
  un archivo de referencia (`.nvmrc` / `engines`)?

---

### RM-002: Fundamentos del backend (NestJS + PostgreSQL)

**Goal:** crear el backend NestJS con PostgreSQL, migraciones y pruebas, respetando que la API es
la fuente de verdad.

**Related capabilities:** cuenta y acceso (soporte), workspaces (soporte).

**Project area / domain:** backend, base de datos.

**Impact:** High

**Risk:** Medium

**Suggested Knowledge Level:** K3

**Dependencies:** decidir ORM (Prisma o Drizzle) y estrategia de autenticación.

**Why this comes now:** no existe backend y todas las capacidades protegidas dependen de la API y
de la base de datos.

**Candidate Work Items:**

- WI-CANDIDATE-003: Inicializar el proyecto NestJS del backend
  - type: chore
  - suggested knowledge level: K2
  - expected value: servicio NestJS que arranca con TypeScript, lint y configuración base.
  - notes: repositorio independiente (multirepo), historial propio.
- WI-CANDIDATE-004: Configurar PostgreSQL y el ORM
  - type: chore
  - suggested knowledge level: K3
  - expected value: conexión a base de datos con migraciones reproducibles en local.
  - notes: depende del ADR de ORM (Prisma vs Drizzle).
- WI-CANDIDATE-005: Estrategia de pruebas del backend (unitarias e integración)
  - type: chore
  - suggested knowledge level: K2
  - expected value: base para exigir tests de permisos en cada funcionalidad.
  - notes: incluir base de datos de pruebas y utilidades de autenticación simulada.

**Open questions:**

- ¿Prisma o Drizzle?
- ¿Passport propio o una librería de autenticación compatible con NestJS?
- ¿Dónde se almacenan los archivos (imagen de perfil, imágenes de tareas, adjuntos del chat)?

---

### RM-003: Cuenta y acceso

**Goal:** permitir registrarse, iniciar sesión y completar el onboarding inicial sin intervención
manual.

**Related capabilities:** cuenta y acceso.

**Project area / domain:** autenticación, onboarding.

**Impact:** High

**Risk:** Medium

**Suggested Knowledge Level:** K3

**Dependencies:** RM-002.

**Why this comes now:** sin identidad no hay sesión, y sin sesión no hay ninguna otra capacidad
protegida.

**Candidate Work Items:**

- WI-CANDIDATE-006: Registro e inicio de sesión con correo y contraseña
  - type: feature
  - suggested knowledge level: K3
  - expected value: una persona crea su cuenta y obtiene una sesión válida.
  - notes: contraseña hasheada; la respuesta nunca incluye el hash.
- WI-CANDIDATE-007: Sesión en cookie `httpOnly` y guard global de autenticación
  - type: feature
  - suggested knowledge level: K3
  - expected value: ningún endpoint entrega datos sin sesión válida salvo los públicos marcados.
  - notes: identidad desde la sesión, nunca desde URL ni cuerpo; CORS con origen explícito.
- WI-CANDIDATE-008: Onboarding inicial (nombre, tipo de uso y primer workspace)
  - type: feature
  - suggested knowledge level: K2
  - expected value: una persona nueva llega a un workspace listo para usar en pocos pasos.
  - notes: tipos de uso: trabajo, estudio o personal.

**Open questions:**

- ¿Se incluye el inicio de sesión con Google en la Fase 1 o se pospone?
- ¿Qué idiomas debe tener la interfaz en la primera versión?

---

### RM-004: Workspaces, roles y permisos

**Goal:** que cada espacio de trabajo tenga sus miembros con un rol, y que el servidor haga cumplir
los permisos en cada petición.

**Related capabilities:** workspaces.

**Project area / domain:** autorización, tenancy.

**Impact:** High

**Risk:** High

**Suggested Knowledge Level:** K3

**Dependencies:** RM-002, RM-003.

**Why this comes now:** el rol y el aislamiento por workspace son la restricción de seguridad
central del producto.

**Candidate Work Items:**

- WI-CANDIDATE-009: Crear, editar y listar workspaces
  - type: feature
  - suggested knowledge level: K3
  - expected value: una persona crea un workspace y lo ve en su lista.
  - notes: borrar un workspace exige escribir su nombre.
- WI-CANDIDATE-010: Invitaciones por enlace con cuatro códigos de rol
  - type: feature
  - suggested knowledge level: K3
  - expected value: se entra a un workspace con un enlace y el código decide el rol inicial.
  - notes: códigos general, admin, edición y solo lectura; rol por defecto `READ_ONLY`.
- WI-CANDIDATE-011: Gestión de miembros y cambio de rol
  - type: feature
  - suggested knowledge level: K3
  - expected value: `OWNER`/`ADMIN` gestionan miembros sin poder tocar al `OWNER`.
  - notes: `ADMIN` no puede cambiar el rol del `OWNER` ni expulsarlo.
- WI-CANDIDATE-012: Guard de roles por workspace y pruebas de permisos
  - type: feature
  - suggested knowledge level: K4
  - expected value: cada acción protegida rechaza sin sesión, sin membresía y con rol insuficiente.
  - notes: verificar pertenencia del recurso al workspace antes de comprobar el rol; probar recurso
    de otro workspace.

**Open questions:**

- ¿Puede un `ADMIN` borrar un workspace o queda solo para el `OWNER`?
- ¿Se puede transferir la propiedad de un workspace? ¿Qué pasa si el `OWNER` elimina su cuenta?

---

### RM-005: Tareas

**Goal:** crear y listar tareas con etiquetas, fechas, varios asignados y guardadas por usuario.

**Related capabilities:** tareas.

**Project area / domain:** tareas.

**Impact:** High

**Risk:** Medium

**Suggested Knowledge Level:** K3

**Dependencies:** RM-004.

**Why this comes now:** las tareas son la capacidad central de la Fase 1 y el primer vertical slice
de valor visible.

**Candidate Work Items:**

- WI-CANDIDATE-013: Crear tarea con editor enriquecido
  - type: feature
  - suggested knowledge level: K3
  - expected value: se crea una tarea con contenido con formato y emoji.
  - notes: creación rápida desde cualquier pantalla con atajo de teclado.
- WI-CANDIDATE-014: Listar tareas asignadas a mí y tareas guardadas
  - type: feature
  - suggested knowledge level: K3
  - expected value: cada persona ve su trabajo y lo que guardó.
  - notes: paginar listas, no cargar todo el historial.
- WI-CANDIDATE-015: Etiquetas, rango de fechas y múltiples asignados
  - type: feature
  - suggested knowledge level: K3
  - expected value: organizar tareas por etiquetas, fechas y responsables.
  - notes: un asignado solo puede ser miembro del workspace.

**Open questions:**

- ¿La creación rápida usa el mismo editor enriquecido o un modo simplificado?

---

### RM-006: Mapas mentales y calendario

**Goal:** añadir planificación visual (mapas mentales) y una vista temporal (calendario mensual).

**Related capabilities:** mapas mentales, calendario.

**Project area / domain:** planificación.

**Impact:** Medium

**Risk:** Medium

**Suggested Knowledge Level:** K3

**Dependencies:** RM-005.

**Why this comes now:** es la Fase 2; depende de que las tareas y sus fechas ya existan.

**Candidate Work Items:**

- WI-CANDIDATE-016: Lienzo de mapas mentales con nodos y conexiones
  - type: feature
  - suggested knowledge level: K4
  - expected value: ordenar ideas en un mapa con etiquetas, colores y asignados por nodo.
  - notes: los mapas se guardan aparte de las tareas.
- WI-CANDIDATE-017: Vista de calendario mensual compartida
  - type: feature
  - suggested knowledge level: K3
  - expected value: ver en un mes las tareas y mapas con fechas.
  - notes: sin sincronización con calendarios externos.

**Open questions:**

- ¿Qué usuario se atiende primero y cómo reordena las fases?

---

### RM-007: Pomodoro y notificaciones

**Goal:** sostener el foco por cuenta y avisar de lo relevante dentro de la aplicación.

**Related capabilities:** pomodoro, notificaciones.

**Project area / domain:** foco, avisos.

**Impact:** Medium

**Risk:** Low

**Suggested Knowledge Level:** K2

**Dependencies:** RM-003, RM-004.

**Why this comes now:** es la Fase 3; el pomodoro depende de la cuenta y las notificaciones de la
membresía al workspace.

**Candidate Work Items:**

- WI-CANDIDATE-018: Temporizador pomodoro por cuenta
  - type: feature
  - suggested knowledge level: K2
  - expected value: duraciones, rondas y sonidos configurables guardados por cuenta.
  - notes: por usuario, no por navegador; por defecto 25/5/15, largo cada 2 rondas, 3 rondas.
- WI-CANDIDATE-019: Notificaciones dentro de la aplicación
  - type: feature
  - suggested knowledge level: K3
  - expected value: avisos por asignaciones, invitaciones y cambios, con estado visto/clic.
  - notes: registrar asignaciones, cambios de rol, nuevos miembros, salidas y contenido nuevo.

**Open questions:**

- ¿Cuánto tiempo se conservan las notificaciones y los mensajes?

---

### RM-008: Chat colaborativo en tiempo real

**Goal:** conversar dentro del workspace con historial, adjuntos y presencia.

**Related capabilities:** chat del workspace.

**Project area / domain:** colaboración en vivo.

**Impact:** Medium

**Risk:** High

**Suggested Knowledge Level:** K4

**Dependencies:** RM-002, RM-004.

**Why this comes now:** es la Fase 4, la de mayor complejidad técnica (WebSockets y archivos).

**Candidate Work Items:**

- WI-CANDIDATE-020: Chat del workspace con historial, edición y borrado
  - type: feature
  - suggested knowledge level: K4
  - expected value: una conversación por workspace con historial paginado.
  - notes: gateway de WebSockets en NestJS; una conversación por workspace.
- WI-CANDIDATE-021: Adjuntos PDF/imagen y presencia en línea
  - type: feature
  - suggested knowledge level: K4
  - expected value: compartir archivos y ver quién está en línea.
  - notes: depende de la decisión de almacenamiento de archivos.

**Open questions:**

- ¿El chat necesita tiempo real inmediato o basta con actualización periódica al inicio?

---

## Suggested Execution Order

1. **RM-001** — fundamentos del frontend (chore).
2. **RM-002** — fundamentos del backend, PostgreSQL y pruebas (chore).
3. **RM-003** — cuenta, acceso y onboarding.
4. **RM-004** — workspaces, roles y permisos (incluye las pruebas de permisos).
5. **RM-005** — tareas.
6. **RM-006** — mapas mentales y calendario.
7. **RM-007** — pomodoro y notificaciones.
8. **RM-008** — chat en tiempo real.

El orden está justificado por dependencias: primero la base técnica, después identidad, luego
autorización por workspace, y sobre esa base las capacidades de usuario.

## Risks and Constraints

- **Riesgo alto en permisos (RM-004):** una regla mal aplicada expone datos entre workspaces. Se
  mitiga con un guard global, guard de roles y pruebas de permisos obligatorias.
- **Riesgo alto en chat (RM-008):** WebSockets y archivos son la parte más costosa. Se pospone a la
  Fase 4.
- **Decisión de ORM pendiente:** bloquea parcialmente RM-002; conviene cerrarla pronto (ADR).
- **Recursos:** una sola persona y desarrollo por fases. El alcance no debe crecer dentro de una
  fase.
- **Entorno de desarrollo Windows con Git Bash** para evitar el bloqueo de scripts de PowerShell.
- **Sin lógica de negocio en el frontend:** no usar server functions de Start.

## Not Now

- Aplicación móvil nativa.
- Facturación y planes de pago.
- Sincronización con calendarios externos.
- Permisos más finos que el rol de workspace.
- Edición simultánea en tiempo real del mismo documento.
- Enlaces públicos o API pública.
- Renderizado en servidor y SEO del área privada.
- Inicio de sesión con Apple.

## Next Recommended Work Item

**WI-CANDIDATE-003 — Inicializar el proyecto NestJS del backend** (`chore`), dentro de **RM-002**.

Es el bloqueante de la base técnica y habilita el resto de la Fase 1. Antes de materializarlo,
conviene resolver el candidato ADR sobre el ORM (Prisma vs Drizzle).
