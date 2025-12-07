import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class CreateInquiryDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    message: string;
}
