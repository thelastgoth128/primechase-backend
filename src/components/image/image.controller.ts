import { Controller, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { CloudinaryService } from "../services/cloudinary.service";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller('images')
export class ImageController {
    constructor(
        private readonly cloudinaryService : CloudinaryService,
        
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