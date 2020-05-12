import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthLoginDto } from './dto/auth-login.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository : UserRepository,
    ){}

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.userRepository.singUp(authCredentialsDto);
    }

    async signIn(authLoginDto: AuthLoginDto) {
        const result = await this.userRepository.validateUserPassword(authLoginDto);
    }
}
