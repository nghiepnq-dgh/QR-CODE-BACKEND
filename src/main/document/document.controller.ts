import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  Get,
  UseGuards,
  Query,
  Param,
} from '@nestjs/common';
import { DocumentService } from './document.service';
import { CreateDocFileDto } from './dto/create_doc_file.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/decorator/get-user.decorator';
import { User } from '../auth/user.entity';
import { CreateQueryDto } from './dto/query_param.dto';
@Controller('document')
export class DocumentController {
  constructor(private documentService: DocumentService) {}

  @Post()
  async createDocument(
    @Body(ValidationPipe) createDocFileDto: CreateDocFileDto,
  ) {
    const result = await this.documentService.createDocService(
      createDocFileDto,
    );
    return { ...result, success: true };
  }

  @Get()
  @UseGuards(AuthGuard())
  async getAllDoc(
    @GetUser() user: User,
    @Query(ValidationPipe) createQueryDto: CreateQueryDto,
  ) {
    const result = await this.documentService.getAllDoc(user, createQueryDto);
    return { data: result[0], total: result[1] };
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  async getDocById(@GetUser() user: User, @Param('id') id: number) {
    const result = await this.documentService.getDocByIdService(id);
    return result;
  }
}
