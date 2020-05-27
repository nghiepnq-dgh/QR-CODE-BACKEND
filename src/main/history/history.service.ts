import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { History } from './history.entity';
import { HistoryRepository } from './history.repository';

@Injectable()
export class HistoryService {
    constructor(
        @InjectRepository(HistoryRepository)
        private readonly historyRepository : HistoryRepository,
    ){}
}
