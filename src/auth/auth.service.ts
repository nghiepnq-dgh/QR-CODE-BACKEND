import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthLoginDto } from './dto/auth-login.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interface/jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService,
    ) { }

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<User> {
        return this.userRepository.singUp(authCredentialsDto);
    }

    async signIn(authLoginDto: AuthLoginDto): Promise<{acccessToken: string}> {
        const userName = await this.userRepository.validateUserPassword(authLoginDto);
        if (!userName) {
            throw new UnauthorizedException("Sai tài khoản hoặc mật khẩu");
        }

        const payload: JwtPayload = { userName };
        const acccessToken = await this.jwtService.sign(payload);
        return { acccessToken };
    }
}
