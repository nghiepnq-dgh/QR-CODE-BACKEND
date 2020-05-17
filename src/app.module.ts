import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './main/auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { DocumentModule } from './main/document/document.module';
import * as path from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    DocumentModule,
    MailerModule.forRootAsync({
      useFactory: () => ({
        // transport: 'smtps://user@domain.com:pass@smtp.domain.com',
        transport: {
          host: 'smtp.gmail.com',
          port: 465,
          auth: {
            user: "nghiepnq@digitechglobalco.com",
            pass: "186597Cm",
          },
          // secure: false,
          // tls: { rejectUnauthorized: false },
        },
        template: {
          dir: path.resolve(__dirname, 'templates'),          
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
