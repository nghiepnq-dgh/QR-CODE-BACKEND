import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { DocumentService } from './document.service';
import { CreateDocFileDto } from './dto/create_doc_file.dto';

@Controller('document')
export class DocumentController {
    constructor(
        private documentService: DocumentService,
    ) { }

    @Post()
    async createDocument(@Body(ValidationPipe) createDocFileDto: CreateDocFileDto) {
        const result = await this.documentService.createDocService(createDocFileDto);
        return {...result, success: true};
    }
}
