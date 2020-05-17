import { IsNotEmpty, IsEmail, Min, Max } from "class-validator";

export class CreateDocFileDto {
    @IsNotEmpty()
    contend: String;

    @IsNotEmpty()
    @Min(8)
    @Max(20)
    identity: String;

    @IsNotEmpty()
    @IsEmail()
    @Max(30)
    email: String;
}