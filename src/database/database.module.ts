import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';

import config from 'src/config';

@Global()
@Module({
    imports: [
        MongooseModule.forRootAsync({
            useFactory: async (
                configService: ConfigType<typeof config>,
            ): Promise<MongooseModuleOptions> => {
                const { host, connection, port, username, password, name } =
                    configService.database;

                return {
                    uri: `${connection}://${host}:${port}`,
                    user: username,
                    pass: password,
                    dbName: name,
                };
            },
            inject: [config.KEY],
        }),
    ],
    exports: [MongooseModule],
})
export class DatabaseModule {}
