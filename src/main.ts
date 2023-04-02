import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Configuración Swagger en NestJS
    const config = new DocumentBuilder()
        .setTitle('Platzi API')
        .setDescription('Documentación Platzi API')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, config);

    // URL API
    SwaggerModule.setup('docs', app, document);

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transformOptions: {
                enableImplicitConversion: true,
            },
        }),
    );

    app.enableCors();

    await app.listen(3000);
}
bootstrap();
