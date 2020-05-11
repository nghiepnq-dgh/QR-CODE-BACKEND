import {TypeOrmModuleOptions} from '@nestjs/typeorm';
export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: '127.0.0.1',
    port: 5432,
    username: 'postgres',
    password: '12345678',
    database: 'qr_code',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true,
}
