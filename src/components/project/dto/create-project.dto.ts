import { IsDate, IsEmail, IsInt, IsString } from "class-validator"

export class CreateProjectDto {
        @IsString()
        title: string

        @IsString()
        description: string

        @IsString()
        style_reference: string

        @IsString()
        color_preferences: string[]

        @IsString()
        font_preferences: string

        @IsString()
        image_url: string

        @IsDate()
        start_date: Date

        @IsDate()
        due_date: Date

        @IsString()
        client_name: string

        @IsEmail()
        client_email: string

        @IsString()
        status: string

        @IsString()
        rejection_reason: string

        @IsInt()
        category: number

        @IsString({ each: true })
        gallery: string[]

        @IsDate()
        created_at: Date
}
