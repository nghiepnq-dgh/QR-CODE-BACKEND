import {
    IsOptional,
} from 'class-validator';

export class CreateQueryDto {
    @IsOptional()
    page: number = 1;

    @IsOptional()
    limit: number = 10;

    @IsOptional()
    document_id: string;
}
