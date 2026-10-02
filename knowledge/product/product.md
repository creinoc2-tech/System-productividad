---
type: product
status: draft
---

> Idioma del proyecto: **español**. Escribe este conocimiento en español. Mantén en inglés el código, los nombres de archivo, los comandos y las claves de configuración.

# Product

> Created by `kaddo bootstrap`. The minimal **what** of the project. Refine with the
> bootstrap-agent / capability-agent. As this matures it can split into product-brief.md
> and capabilities.md.

## Product Brief

Un espacio de trabajo para equipos pequeños y para personas solas que reúne en una sola aplicación
**tareas, mapas mentales, calendario, chat y temporizador pomodoro**. Cada persona ve su trabajo; cada
equipo comparte el suyo dentro de un **workspace**, con cuatro roles (`OWNER`, `ADMIN`, `CAN_EDIT`,
`READ_ONLY`) que el servidor hace cumplir en cada petición.

Se entra a un workspace con un enlace de invitación, y el código usado decide el rol inicial.

## Capabilities

**Cuenta y acceso**
- Registro e inicio de sesión con correo y contraseña, y con Google.
- Onboarding corto: nombre, tipo de uso (trabajo, estudio o personal) y primer workspace.

**Workspaces**
- Crear, editar y borrar workspaces (el borrado exige escribir su nombre).
- Invitar por enlace con cuatro códigos distintos (general, admin, edición, solo lectura).
- Cambiar roles, expulsar miembros y salir del workspace.

**Tareas**
- Editor enriquecido con emoji, etiquetas, rango de fechas y varias personas asignadas.
- Vista de tareas asignadas a mí y vista de tareas guardadas.
- Creación rápida desde cualquier pantalla con un atajo de teclado.

**Mapas mentales**
- Lienzo de nodos y conexiones con etiquetas, colores y asignados por nodo.
- Se guardan aparte de las tareas, para que un mapa sobreviva a la tarea que lo originó.

**Calendario**
- Vista mensual compartida con las tareas y mapas que tienen fechas.

**Chat del workspace**
- Una conversación por workspace con historial, edición y borrado de mensajes, adjuntos y
  presencia en línea.

**Pomodoro**
- Duraciones, rondas y sonidos configurables, guardados **por cuenta** y no por navegador.

**Notificaciones**
- Avisos dentro de la aplicación por asignaciones, invitaciones y cambios en el workspace, con
  estado de *visto* y de *clic* por separado.

**Ajustes**
- Perfil, tema claro y oscuro, e idioma de la interfaz.

## Scope

El alcance se entrega **por fases**. Cada fase debe funcionar de punta a punta y tener sus tests de
permisos antes de pasar a la siguiente.

1. **Fase 1, núcleo:** cuenta, onboarding, workspaces con roles e invitaciones, y tareas con
   etiquetas, fechas, asignados y guardadas.
2. **Fase 2, planificación:** mapas mentales y calendario.
3. **Fase 3, foco y avisos:** pomodoro y notificaciones.
4. **Fase 4, colaboración en vivo:** chat con adjuntos y presencia en línea.

## Out of Scope

- Aplicación móvil nativa.
- Facturación, planes de pago e integraciones con cobros.
- Sincronización con calendarios externos (Google Calendar, Outlook).
- Permisos más finos que el rol de workspace (por tarea, por mapa o por etiqueta).
- Edición simultánea del mismo documento por varias personas en tiempo real.
- Enlaces públicos para compartir contenido sin cuenta.
- Aplicaciones de terceros o API pública para otros desarrolladores.
- Renderizado en servidor y SEO para el área privada de la aplicación.

## Success Criteria

- **Seguridad verificable:** ninguna ruta devuelve datos sin sesión válida (salvo las públicas
  marcadas), y ninguna respuesta incluye el hash de la contraseña. Ambos puntos tienen test
  automático.
- **Permisos probados:** cada acción protegida tiene tests para sin sesión, sin ser miembro, rol
  insuficiente y recurso de otro workspace, y todos pasan.
- **Flujo completo de la fase 1:** una persona nueva se registra, crea un workspace, invita a otra
  con rol `READ_ONLY` y crea una tarea, sin intervención manual.
- **Rol respetado:** una persona `READ_ONLY` ve el contenido pero el servidor rechaza cualquier
  intento de modificarlo, aunque se haga la petición directamente a la API.
- **Propietario protegido:** un `ADMIN` no puede cambiar el rol de un `OWNER` ni expulsarlo.
- **Rendimiento básico:** las listas (tareas, mensajes) se paginan y no cargan todo el historial.

## Assumptions

- **Hipótesis:** el objetivo es aprender y construir un proyecto de portafolio, no lanzar un
  producto comercial a corto plazo (ver `business.md`).
- **Hipótesis:** equipos de pocas personas y uso individual son los casos de uso suficientes; no se
  diseña para organizaciones grandes.
- **Hipótesis:** con la fase 1 el producto ya demuestra su valor sin necesitar el resto.
- **Hipótesis:** cuatro roles bastan para todos los casos de colaboración previstos.
- El chat de la fase 4 puede resolverse con un gateway de WebSockets en el repositorio del backend.

## Open Questions

- ¿Qué usuario se atiende primero (equipo, estudiante o persona sola)? Puede reordenar las fases.
- ¿Qué idiomas debe tener la interfaz al salir la primera versión?
- ¿Se incluye el inicio de sesión con Apple? Exige una cuenta de pago de Apple Developer.
- ¿Dónde se almacenan los archivos (imagen de perfil, imágenes de tareas, adjuntos del chat)?
- ¿Puede un `ADMIN` borrar un workspace, o solo el `OWNER`?
- ¿Qué pasa con un workspace si su `OWNER` elimina la cuenta? ¿Se puede transferir la propiedad?
- ¿Cuánto tiempo se conservan las notificaciones y los mensajes?
- ¿Qué fecha objetivo tiene la fase 1?

## Quality checklist

- [x] The product fits in one page.
- [x] Scope and out-of-scope are explicit.
- [ ] Success criteria have been agreed with the owner.
- [ ] Phase order has been confirmed against the primary user.