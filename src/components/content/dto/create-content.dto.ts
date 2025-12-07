import { IsString, IsNotEmpty } from 'class-validator';

export class CreateContentDto {
    @IsString()
    @IsNotEmpty()
    page: string;

    @IsString()
    @IsNotEmpty()
    section: string;

    @IsString()
    @IsNotEmpty()
    key: string;

    @IsString()
    @IsNotEmpty()
    value: string;
}
