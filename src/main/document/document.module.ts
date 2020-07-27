import { Module } from '@nestjs/common';
import { DocumentController } from './document.controller';
import { DocumentService } from './document.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentRepository } from './document.repository';
import { UserRepository } from '../auth/user.repository';
import { PassportModule } from '@nestjs/passport';
import { HistoryRepository } from '../history/history.repository';
import { RoomRepository } from '../room/room.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DocumentRepository,
      UserRepository,
      HistoryRepository,
      RoomRepository,
    ]),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
  ],
  controllers: [DocumentController],
  providers: [DocumentService],
})
export class DocumentModule {}
