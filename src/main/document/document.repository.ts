import { Repository, EntityRepository, FindManyOptions } from 'typeorm';
import { FileDoc } from './document.entity';
import { User } from '../auth/user.entity';
import { CreateDocFileDto } from './dto/create_doc_file.dto';
import { CreateQueryDto } from './dto/query_param.dto';
import { ROLE_USER } from 'src/contants';
import { BadRequestException } from '@nestjs/common';
import { random } from '@supercharge/strings';
@EntityRepository(FileDoc)
export class DocumentRepository extends Repository<FileDoc> {
  async createDocumentRepository(
    createDocFileDto: CreateDocFileDto,
    user: User,
  ) {
    const { contend } = createDocFileDto;
    const document = new FileDoc();
    document.user = user;
    document.contend = contend;
    document.id = random(6).toLowerCase();
    //save document
    console.log('document', document);

    const result = await this.save({
      ...document,
    });
    return result;
  }

  async getAllDocRepository(user: User, createQueryDto: CreateQueryDto) {
    const { role, id } = user;
    const { limit, page, document_id: documentId } = createQueryDto;
    const _limit = limit ? limit : 10;
    const _page = page ? page : 1;

    let qb = this.createQueryBuilder('file_doc')
      .leftJoinAndSelect('file_doc.user', 'user')
      .skip((_page - 1) * _limit)
      .take(_limit);

    if (role === ROLE_USER.NORMAL) {
      qb = qb.andWhere('user.id= :id', { id });
    }

    if (documentId) {
      qb = qb.andWhere('file_doc.id= :documentId', { documentId });
    }
    
    const result = await qb.getManyAndCount();
    return result;
  }

  async getDocByIdRepository(id: number) {
    const result = await this.findOne(id, { relations: ['user'] });
    if (!result) throw new BadRequestException('Không tìm thấý hồ sơ');
    return result;
  }
}
