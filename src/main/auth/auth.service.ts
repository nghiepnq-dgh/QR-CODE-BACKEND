import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthLoginDto } from './dto/auth-login.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interface/jwt-payload.interface';
import { user_db } from '../seed/user_db_seed';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService,
    ) { }

    async findUser(identity: string): Promise<User> {
        const user = this.userRepository.findUserRepository(identity);
        return user;
    }

    async seedUserServicer() {
        const result = await Promise.all(user_db.map(async item => {
            await this.signUp(item);
        }))
        console.log("----",result);
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
}
