import { IsString } from 'class-validator';
export class ChangePassDto {
    @IsString()
    password: string;

    @IsString()
    newPassword: string;

    @IsString()
    reNewPassword: string;

}