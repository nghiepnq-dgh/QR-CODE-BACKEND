import { IsNotEmpty, IsEmail } from "class-validator";

export class CreateDocFileDto {
    @IsNotEmpty()
    contend: string;

    @IsNotEmpty()
    identity: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;
}