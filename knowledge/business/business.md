---
type: business
status: draft
generated_by: business-agent
template_version: 1
---

> Idioma del proyecto: **español**. Escribe este conocimiento en español. Mantén en inglés el código, los nombres de archivo, los comandos y las claves de configuración.

# Business

> Created by `kaddo bootstrap`. The minimal **why** of the project. Refine with the
> business-agent. As this matures it can split into problem.md, users.md, …

## Problem

Las personas y los equipos pequeños reparten su trabajo en herramientas separadas: una para tareas,
otra para ordenar ideas, otra para fechas, otra para conversar y otra para concentrarse. Al
repartirlo se pierde el contexto y se vuelven difíciles de responder tres preguntas básicas:

- **Qué hay que hacer y para cuándo**, sin saltar entre aplicaciones.
- **Quién es responsable de cada cosa**, cuando varias personas comparten el trabajo.
- **Quién puede ver o cambiar qué**, cuando se comparte espacio con gente de distinta confianza
  (un compañero, un cliente, alguien que solo debe mirar).

Además, quien trabaja o estudia solo tiene el mismo problema de dispersión, sin la parte de
colaboración.

## Users

Los perfiles se distinguen por cómo usan el sistema: para trabajo, para estudio o para uso
personal. Los roles describen quién es cada persona dentro de un espacio compartido.

| Perfil | Qué quiere lograr |
|---|---|
| **Persona que trabaja en equipo** | Repartir tareas, ver qué le asignaron, conversar con el equipo y no perder el hilo de cada proyecto. |
| **Estudiante** | Organizar materias y entregas por fecha, ordenar ideas en mapas mentales y mantener sesiones de estudio con pomodoro. |
| **Persona que lo usa sola** | Un único lugar para sus tareas, su calendario y su foco, sin configurar nada de equipo. |

Roles dentro de un workspace:

| Rol | Objetivo dentro del espacio |
|---|---|
| `OWNER` | Ser dueño del espacio: decidir quién entra, con qué rol, y poder borrarlo. |
| `ADMIN` | Gestionar miembros y contenido sin ser el dueño. |
| `CAN_EDIT` | Crear y editar tareas y mapas mentales. |
| `READ_ONLY` | Consultar el trabajo sin poder modificarlo (por ejemplo un cliente o un observador). |

## Value Proposition

Un solo lugar donde cada persona ve **su** trabajo y cada equipo comparte **el suyo**, con permisos
claros:

- **Todo junto:** tareas con editor enriquecido, mapas mentales, calendario, chat del espacio,
  temporizador pomodoro y notificaciones, en una sola aplicación.
- **Compartir con control:** el acceso se decide por rol y por espacio, y se comprueba en el
  servidor, no solo en la interfaz.
- **Empezar rápido:** onboarding corto (nombre, tipo de uso, primer workspace) y entrada al espacio
  mediante un enlace de invitación.
- **Útil en solitario y en equipo:** el mismo producto sirve a quien trabaja solo y a quien
  colabora.

## Business Rules

Estructura y acceso:

- Todo el contenido (tareas, mapas mentales, etiquetas, chat) pertenece a **un workspace**.
- Una persona accede a un workspace mediante una **suscripción** con un único rol. El rol por
  defecto de una suscripción es `READ_ONLY`.
- Un workspace tiene **cuatro códigos de invitación distintos**: general, admin, edición y solo
  lectura. El código con el que se entra determina el rol inicial.
- `READ_ONLY` no puede modificar contenido. `CAN_EDIT` y `READ_ONLY` no pueden gestionar miembros.
- Borrar un workspace exige **escribir su nombre** como confirmación.

Contenido:

- Cada workspace tiene **una conversación** de chat. Los mensajes pueden editarse y borrarse, y
  admiten adjuntos de tipo PDF o imagen.
- Tareas y mapas mentales se pueden **asignar a varias personas**, **marcar como guardados** por
  usuario y **etiquetar**. Las tareas admiten un rango de fechas.
- Las notificaciones registran asignaciones, cambios de rol, nuevos miembros, salidas y contenido
  nuevo, con estado de *visto* y de *clic* por separado.
- El pomodoro es **por usuario**, no por navegador. Valores por defecto: 25 min de trabajo, 5 de
  descanso corto, 15 de descanso largo, descanso largo cada 2 rondas y 3 rondas.

Seguridad y calidad:

- **Ningún dato se entrega sin sesión válida.** Todo endpoint exige autenticación salvo los
  marcados explícitamente como públicos.
- **La identidad sale siempre de la sesión.** El `userId` nunca se acepta desde la URL ni desde el
  cuerpo de la petición.
- **Todo recurso se consulta dentro de su workspace.** Antes de comprobar el rol se verifica que la
  tarea, el mapa o el chat pertenezcan al workspace sobre el que se pide permiso.
- **El `OWNER` está protegido.** Un `ADMIN` no puede cambiarle el rol ni expulsarlo.
- **Las respuestas nunca incluyen datos secretos**, como el hash de la contraseña.
- **Los errores usan códigos HTTP correctos** (400, 401, 403, 404, 409).
- **Cada regla de permiso tiene un test:** sin sesión, sin ser miembro, con rol insuficiente y con
  un recurso de otro workspace.

## Constraints

- **Arquitectura decidida:** **multirepo**, con dos repositorios independientes: el frontend en
  React con TanStack Start (modo SPA) y el backend en NestJS. Cada uno tiene su propio historial,
  su propia integración continua y su propio despliegue. No hay paquete de código compartido: la
  API es la fuente de verdad y el frontend consume su contrato.
- **Sin lógica de negocio en el frontend.** No se usan server functions de Start; toda la lógica y
  la autorización viven en NestJS.
- **Autorización cerrada por defecto:** un guard global de autenticación y un guard de roles por
  workspace. Es una restricción de diseño, no una mejora opcional.
- **Base de datos:** PostgreSQL. El ORM (Prisma o Drizzle) está pendiente de decisión.
- **Tiempo real:** el chat y la presencia dependen de un gateway de WebSockets en NestJS, porque
  Start no trae WebSockets integrados.
- **Autenticación entre dos servidores:** la sesión viaja en cookie `httpOnly`; frontend y API
  deben compartir sitio o configurar CORS con origen explícito y credenciales.
- **Alcance y recursos:** proyecto de una persona. El desarrollo se hace **por fases**, no todo de
  golpe.
- **Calidad mínima:** ninguna funcionalidad se da por terminada sin sus tests de permisos.
- **Entorno de desarrollo:** Windows, con Git Bash para evitar el bloqueo de scripts de PowerShell.

## Assumptions

- **Hipótesis:** el dolor principal de los usuarios es la dispersión entre herramientas, y no
  alguna función concreta que falte. No hay evidencia de usuarios reales todavía.
- **Hipótesis:** una persona que trabaja sola y un equipo pequeño pueden compartir el mismo
  producto sin que ninguno de los dos lo sienta sobrecargado.
- **Hipótesis:** los cuatro roles actuales son suficientes; no se necesitan permisos más finos
  (por ejemplo, por tarea).
- **Hipótesis:** el objetivo del proyecto es **aprender NestJS y construir un proyecto de
  portafolio sólido**, no lanzar un producto comercial a corto plazo.
- **Hipótesis:** una primera versión con login, workspaces con roles y tareas ya demuestra el valor
  del producto; mapas mentales, calendario y chat pueden llegar después.
- Los usuarios aceptan registrarse con correo y contraseña o con Google.

## Open Questions

- ¿Quién es el usuario principal que se quiere atender primero: equipos, estudiantes o personas
  solas? Cambia qué funciones entran en la primera versión.
- ¿El proyecto es solo de aprendizaje y portafolio, o se piensa publicar y mantener para usuarios
  reales? Condiciona hosting, soporte y privacidad de datos.
- ¿Habrá modelo de pago? Hoy la suscripción es solo una membresía de workspace, **no** una
  facturación.
- ¿Puede un `ADMIN` borrar un workspace, o queda solo para el `OWNER`?
- ¿Se puede **transferir la propiedad** de un workspace? ¿Qué pasa con un workspace si su `OWNER`
  elimina la cuenta?
- ¿Prisma o Drizzle? ¿Passport propio o una librería de autenticación que funcione con NestJS?
- ¿Qué servicio se usará para almacenar archivos (imágenes de perfil, imágenes de tareas y
  adjuntos del chat)?
- ¿Se incluye el inicio de sesión con Apple? Exige una cuenta de pago de Apple Developer.
- ¿Qué idiomas debe tener la interfaz?
- ¿Qué cuenta como "primera versión terminada" y con qué fecha objetivo?
- ¿El chat necesita tiempo real inmediato o basta con actualización periódica al inicio?

## Quality checklist

- [x] The problem is stated without assuming the solution.
- [x] Users have goals, not just labels.
- [ ] Hypotheses in *Assumptions* have been validated with real users or confirmed by the owner.
- [ ] Open questions about scope (primary user, learning vs. product, payment) have an answer.