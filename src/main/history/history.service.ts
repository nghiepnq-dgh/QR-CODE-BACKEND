import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { History } from './history.entity';
import { HistoryRepository } from './history.repository';
import { User } from '../auth/user.entity';
import { CreateQueryDto } from '../document/dto/query_param.dto';

@Injectable()
export class HistoryService {
    constructor(
        @InjectRepository(HistoryRepository)
        private readonly historyRepository : HistoryRepository,
    ){}


    async listHistory(user: User, query: CreateQueryDto) {
        const result = await this.historyRepository.listHistory(user, query);
        return result;
    }
}
