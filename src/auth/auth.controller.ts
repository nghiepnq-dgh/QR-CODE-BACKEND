import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) {}

    @Post('/signup')
    async signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto) {
        const result = await this.authService.signUp(authCredentialsDto);
        return { success: true, result};
    }

    @Post('/signin')
    signIn(@Body(ValidationPipe) authLoginDto: AuthLoginDto): Promise<{acccessToken: string}> {
        return this.authService.signIn(authLoginDto);
    }
}
