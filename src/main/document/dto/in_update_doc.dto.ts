import { IsNotEmpty, IsEmail, IsOptional } from "class-validator";
import { STATUS_DOC } from "src/common/status_doc";

export class UpdateStatusDocFileDto {
    @IsNotEmpty()
    status: STATUS_DOC;

    @IsOptional()
    reason: string;
}