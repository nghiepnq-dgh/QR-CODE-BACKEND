import { Controller, Post, Body, ValidationPipe, UseGuards, Req, Request } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../../decorator/get-user.decorator';
@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) { }

    @Post('/signup')
    async signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto) {
        const result = await this.authService.signUp(authCredentialsDto);
        return { success: true, result };
    }

    @Post('/signin')
    signIn(@Body(ValidationPipe) authLoginDto: AuthLoginDto): Promise<{ acccessToken: string }> {
        return this.authService.signIn(authLoginDto);
    }

    @Post("/me")
    @UseGuards(AuthGuard())
    test(@GetUser() user: User) {
        console.log(user);
    }
}
