import { Repository, EntityRepository } from 'typeorm';
import { History } from './history.entity';
import { User } from '../auth/user.entity';
import { CreateQueryDto } from '../document/dto/query_param.dto';

@EntityRepository(History)
export class HistoryRepository extends Repository<History> {
  async listHistory(user: User, query: CreateQueryDto) {
    const { id } = user;
    const { limit, page } = query;
    const _limit = limit ? limit : 10;
    const _page = page ? page : 1;

    let qb = this.createQueryBuilder('history')
      .leftJoinAndSelect('history.user', 'user')
      .leftJoinAndSelect('history.document', 'document')
      .andWhere('user.id= :id', { id })
      .skip((_page - 1) * _limit)
      .take(_limit);

    const result = await qb.getManyAndCount();
    return result;
  }
}
