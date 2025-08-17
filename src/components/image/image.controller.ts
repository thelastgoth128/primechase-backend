import { BadRequestException, Controller, Param, Patch, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { CloudinaryService } from "../services/cloudinary.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { ImageService } from "./image.service";
import { Public } from "../auth/guards/public";
import { url } from "inspector";
import type { UploadApiOptions, UploadApiResponse } from "cloudinary";

@Public()
@Controller('images')
export class ImageController {
    constructor(
        private readonly cloudinaryService : CloudinaryService,
        private readonly imageService : ImageService
    ){}

    @Post('upload/:id')
    @UseInterceptors(FileInterceptor('image'))
    async uploadProjectImage(@UploadedFile() file: Express.Multer.File,@Param('id') id: number, options?: UploadApiOptions){
        try{

            const result = await this.cloudinaryService.uploadImage(file.path,{
                transformation:[
                    {width: 800, crop: 'scale'},
                    {quality:'auto'},
                    {fetch_format: 'auto'}
                ]
            })
            await this.imageService.saveProjectImageUrl(id,result.optimized_url)
            return {
                message:'Image uploaded successfully',
                url: result.optimized_url
            }
        }catch(error){
            throw new Error('Failed to upload image')
        }
    }

    @Patch('update/:id')
    @UseInterceptors(FileInterceptor('image'))
    async updateImage(@UploadedFile() file: Express.Multer.File, @Param("id") id: number,){
        try{
            const result = await this.cloudinaryService.uploadImage(file.path)
            await this.imageService.saveProjectImageUrl(id,result.url)

            return result
        }catch(error){
            throw new Error('Failed to update image')
        }
    }
}