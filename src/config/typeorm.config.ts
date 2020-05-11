import {TypeOrmModuleOptions} from '@nestjs/typeorm';
export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'locahost',
    port: 5432,
    username: 'postgres',
    password: '12345678',
    database: 'qr_code',
    entities: [__dirname + '/../**/*.entity.ts'],
    synchronize: true,
}
