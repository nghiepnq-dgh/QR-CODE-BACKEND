import { Repository, EntityRepository } from "typeorm";
import { FileDoc } from "./document.entity";
import { User } from "../auth/user.entity";
import { CreateDocFileDto } from "./dto/create_doc_file.dto";

@EntityRepository(FileDoc)
export class DocumentRepository extends Repository<FileDoc> {
    async createDocumentRepository(createDocFileDto: CreateDocFileDto, user: User) {
        const { email, contend, identity } = createDocFileDto;
            const document = new FileDoc();
            document.user = user;
            document.contend = contend;
            //save document
            console.log("document", document)

            const result = await this.save({
                ...document
            });
            console.log("resul3333333t", result)
            return result;
    };
}