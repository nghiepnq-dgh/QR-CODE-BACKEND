import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import {RoomRepository} from '../room/room.repository';
@Module({
  imports:[
    TypeOrmModule.forFeature([RoomRepository]),
    PassportModule.register({
      defaultStrategy: 'jwt',
    })
  ],
  providers: [],
  controllers: []
})
export class RoomModule {}
