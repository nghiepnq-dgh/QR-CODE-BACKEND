import { IsString, MinLength, MaxLength  } from 'class-validator';
export class AuthLoginDto {
    @IsString()
    @MaxLength(20)
    identity: string;

    @IsString()
    @MinLength(8)
    @MaxLength(20)
    password: string;
  
}