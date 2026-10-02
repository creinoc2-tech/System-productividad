import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './module/app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Sistema-produccion API')
    .setDescription(
      'API para gestionar tareas, mapas mentales, calendario, chat y pomodoro por workspace.',
    )
    .setVersion('1.0.0')
    .setContact(
      'Sistema-produccion',
      'https://github.com/creinoc2-tech/System-productividad',
      'soporte@ejemplo.com',
    )
    .setLicense('MIT', 'https://opensource.org/licenses/MIT')
    .addServer('http://localhost:3000', 'Servidor local')
    .addCookieAuth('session')
    .addTag('auth', 'Registro, inicio de sesión y sesión')
    .addTag('workspaces', 'Workspaces, miembros e invitaciones')
    .addTag('tasks', 'Tareas, etiquetas, fechas y asignados')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document, {
    swaggerOptions: { persistAuthorization: true },
  });

  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
