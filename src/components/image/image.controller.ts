import { Body, Controller, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { CloudinaryService } from "../services/cloudinary.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { ImageService } from "./image.service";
import { Public } from "../auth/guards/public";

@Public()
@Controller('images')
export class ImageController {
    constructor(
        private readonly cloudinaryService : CloudinaryService,
        private readonly imageService : ImageService
    ){}

    @Post('upload')
    @UseInterceptors(FileInterceptor('image'))
    async uploadProjectImage(@UploadedFile() file: Express.Multer.File,@Body('project_id') id: number){
        try{
            const result = await this.cloudinaryService.uploadImage(file.path)
            await this.imageService.saveProjectImageUrl(id,result.url)
            return result
        }catch(error){
            throw new Error('Failed to upload image')
        }
    }
}