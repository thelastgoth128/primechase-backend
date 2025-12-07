import { IsDate, IsEmail, IsString, IsStrongPassword, IsOptional } from "class-validator";
import { Role } from "src/components/enums/role.enum";

export class CreateUserDto {
    @IsString()
    name: string

    @IsEmail()
    email: string

    @IsStrongPassword()
    password: string

    @IsString()
    role: Role

    @IsDate()
    created_at: Date

    @IsString()
    @IsOptional()
    reset_token?: string

    @IsDate()
    @IsOptional()
    reset_token_expiry?: Date
}
