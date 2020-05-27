import { Module } from '@nestjs/common';
import { DocumentController } from './document.controller';
import { DocumentService } from './document.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentRepository } from './document.repository';
import { UserRepository } from '../auth/user.repository';
import { PassportModule } from '@nestjs/passport';
import { HistoryRepository } from '../history/history.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DocumentRepository,
      UserRepository,
      HistoryRepository,
    ]),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
  ],
  controllers: [DocumentController],
  providers: [DocumentService],
})
export class DocumentModule {}
