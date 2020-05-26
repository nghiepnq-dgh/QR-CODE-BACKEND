import { Repository, EntityRepository } from 'typeorm';
import { FileDoc } from './document.entity';
import { User } from '../auth/user.entity';
import { CreateDocFileDto } from './dto/create_doc_file.dto';
import { CreateQueryDto } from './dto/query_param.dto';
import { ROLE_USER } from 'src/contants';

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
        console.log('---------', id);
        const { limit, page, document_id: documentId } = createQueryDto;
        console.log('------------', createQueryDto);

        const _limit = limit ? limit : 10;
        const where = {
            relations: ['user'],
        };

        if (page) {
            where['skip'] = (+page - 1) * +_limit;
            where['take'] = +_limit;
        }

        console.log('---------where------>, ', where);

        if (role === ROLE_USER.NORMAL) {
            console.log('---------id------>, ', id);
            where['userId'] = id;
        }

        console.log('---------where------>, ', where);
        if (documentId) {
            where['id'] = documentId;
        }
        console.log('---------where------>, ', where);
        const result = await this.findAndCount({
            ...where,
        });
        console.log('-------------->', result);

        return result;
    }
}
