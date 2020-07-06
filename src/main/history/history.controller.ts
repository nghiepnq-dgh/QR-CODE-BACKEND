import { Controller, Get, UseGuards, Query } from '@nestjs/common';
import { HistoryService } from './history.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../auth/user.entity';
import { GetUser } from 'src/decorator/get-user.decorator';
import { CreateQueryDto } from '../document/dto/query_param.dto';

@Controller('history')
export class HistoryController {
    constructor(private historyService: HistoryService) {}

    @Get()
    @UseGuards(AuthGuard())
    async listHistory(
      @GetUser() user: User,
      @Query() createQueryDto: CreateQueryDto,
      ) {
      const result = await this.historyService.listHistory(user, createQueryDto);
      return { data: result[0], total: result[1] };
    }
  
}
