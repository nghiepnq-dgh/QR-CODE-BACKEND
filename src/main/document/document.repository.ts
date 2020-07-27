import { Repository, EntityRepository } from 'typeorm';
import { FileDoc } from './document.entity';
import { User } from '../auth/user.entity';
import { CreateDocFileDto } from './dto/create_doc_file.dto';
import { CreateQueryDto } from './dto/query_param.dto';
import { ROLE_USER } from 'src/contants';
import { BadRequestException } from '@nestjs/common';
import { random } from '@supercharge/strings';
import { Room } from '../room/room.entity';
@EntityRepository(FileDoc)
export class DocumentRepository extends Repository<FileDoc> {
  constructor() {
    super();
    
  } 
  async createDocumentRepository(
    createDocFileDto: CreateDocFileDto,
    user: User,
    room: Room
  ) {
    const { contend } = createDocFileDto;
    console.log("DEBUG_CODE: DocumentRepository -> room", room);
    const document = new FileDoc();
    document.user = user;
    document.contend = contend;
    document.rooms = [room];
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
    console.log("DEBUG_CODE: DocumentRepository -> getAllDocRepository -> id", id);
    console.log("DEBUG_CODE: DocumentRepository -> getAllDocRepository -> role", role);
    const { limit, page, document_id: documentId } = createQueryDto;
    const _limit = limit ? limit : 10;
    const _page = page ? page : 1;

    let qb = this.createQueryBuilder('file_doc')
      .leftJoinAndSelect('file_doc.user', 'user')
      .leftJoinAndSelect('file_doc.rooms', 'rooms')
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
    const result = await this.findOne(id, { relations: ['user', 'rooms'] });
    if (!result) throw new BadRequestException('Không tìm thấý hồ sơ');
    return result;
  }
}
