import { Module } from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryController } from './history.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentRepository } from '../document/document.repository';
import { HistoryRepository } from './history.repository';

@Module({
  imports:[
    TypeOrmModule.forFeature([DocumentRepository, HistoryRepository]),
  ],
  providers: [HistoryService],
  controllers: [HistoryController]
})
export class HistoryModule {}
