import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
    return {
        database: {
            host: process.env.DATABASE_HOST,
            connection: process.env.DATABASE_CONECTION,
            port: process.env.DATABASE_PORT,
            username: process.env.DATABASE_USERNAME,
            password: process.env.DATABASE_PASSWORD,
            name: process.env.DATABASE_NAME,
        },
    };
});
