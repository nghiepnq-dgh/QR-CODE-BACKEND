import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthLoginDto } from './dto/auth-login.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interface/jwt-payload.interface';
import { userDb } from '../seed/user_db_seed';
import { RoomRepository } from '../room/room.repository';
import { roomDb } from '../seed/room';
import { ChangePassDto } from './dto/change-password.dto';

@Injectable()
export class AuthService {
    constructor(
        private roomRepository: RoomRepository,
        private userRepository: UserRepository,
        private jwtService: JwtService,
    ) { }

    async findUser(identity: string): Promise<User> {
        const user = this.userRepository.findUserRepository(identity);
        return user;
    }

    async seedUserServicer() {
        const result = await Promise.all(userDb.map(async item => {
            await this.signUp(item);
        }))
        return result;
    }

    async seedRoom() {
        const room = await Promise.all(roomDb.map(async item => {
            await this.roomRepository.save(item);
        }))

        return room; 
    }

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<User> {
        return this.userRepository.singUp(authCredentialsDto);
    }

    async signIn(authLoginDto: AuthLoginDto): Promise<{ acccessToken: string }> {
        const identity = await this.userRepository.validateUserPassword(authLoginDto);
        if (!identity) {
            throw new UnauthorizedException("Sai tài khoản hoặc mật khẩu");
        }

        const payload: JwtPayload = { identity };
        const acccessToken = await this.jwtService.sign(payload);
        return { acccessToken };
    }

    async changePassword(data: ChangePassDto, user: User) {
        return this.userRepository.changePass(data, user);
    }
}
