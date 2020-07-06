import { Module } from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryController } from './history.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentRepository } from '../document/document.repository';
import { HistoryRepository } from './history.repository';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports:[
    TypeOrmModule.forFeature([DocumentRepository, HistoryRepository]),
    PassportModule.register({
      defaultStrategy: 'jwt',
    })
  ],
  providers: [HistoryService],
  controllers: [HistoryController]
})
export class HistoryModule {}
