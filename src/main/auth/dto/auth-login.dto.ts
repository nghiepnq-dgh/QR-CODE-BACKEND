import { IsEmail, IsNotEmpty, IsString, MinLength, MaxLength, IsOptional, ArrayContains } from 'class-validator';
import { ROLE_USER } from 'src/contants';
export class AuthLoginDto {
    @IsString()
    @MaxLength(20)
    identity: string;

    @IsString()
    @MinLength(8)
    @MaxLength(20)
    password: string;
  
}