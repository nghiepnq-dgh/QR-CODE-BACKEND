import { Repository, EntityRepository } from 'typeorm';
import { FileDoc } from './document.entity';
import { User } from '../auth/user.entity';
import { CreateDocFileDto } from './dto/create_doc_file.dto';
import { CreateQueryDto } from './dto/query_param.dto';
import { ROLE_USER } from 'src/contants';
import { BadRequestException } from '@nestjs/common';

@EntityRepository(FileDoc)
export class DocumentRepository extends Repository<FileDoc> {
  async createDocumentRepository(
    createDocFileDto: CreateDocFileDto,
    user: User,
  ) {
    const { email, contend, identity } = createDocFileDto;
    const document = new FileDoc();
    document.user = user;
    document.contend = contend;
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
    const where = {
      relations: ['user'],
    };

    if (page) {
      where['skip'] = (+page - 1) * +_limit;
      where['take'] = +_limit;
    }

    if (role === ROLE_USER.NORMAL) {
      where['userId'] = id;
    }

    if (documentId) {
      where['id'] = documentId;
    }
    const result = await this.findAndCount({
      ...where,
    });

    return result;
  }

  async getDocByIdRepository(id: number) {
    const result = await this.findOne(id, { relations: ['user'] });
    if (!result) throw new BadRequestException('Không tìm thấý hồ sơ');
    return result;
  }
}
