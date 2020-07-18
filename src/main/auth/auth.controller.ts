import {
    Controller,
    Post,
    Body,
    ValidationPipe,
    UseGuards,
    Req,
    Request,
} from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../../decorator/get-user.decorator';
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/signup')
    async signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto) {
        const result = await this.authService.signUp(authCredentialsDto);
        return { success: true, result };
    }

    @Post('/seed_user')
    async seedUser() {
        const result = await this.authService.seedUserServicer();
        return { success: true, result };
    }
    @Post('/seed_room')
    async seedRoom() {
        const result = await this.authService.seedRoom();
        return { success: true, result };
    }


    @Post('/signin')
    async signIn(@Body(ValidationPipe) authLoginDto: AuthLoginDto) {
        const result = await this.authService.signIn(authLoginDto);
        return { success: true, ...result };
    }

    @Post('/me')
    @UseGuards(AuthGuard())
    me(@GetUser() user: User) {
        return user;
    }
}
