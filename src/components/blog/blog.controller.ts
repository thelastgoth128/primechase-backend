import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../enums/role.enum';
import { Public } from '../auth/guards/public';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '../services/cloudinary.service';

@Controller('blog')
export class BlogController {
    constructor(
        private readonly blogService: BlogService,
        private readonly cloudinaryService: CloudinaryService
    ) { }

    @Post()
    @Roles(Role.ADMIN, Role.CONTRIBUTOR)
    @UseInterceptors(FileInterceptor('image'))
    async create(@UploadedFile() file: Express.Multer.File, @Body() createBlogDto: CreateBlogDto) {
        if (file) {
            const result = await this.cloudinaryService.uploadImage(file.path);
            if ('secure_url' in result) {
                createBlogDto.image_url = result.secure_url;
            }
        }
        return this.blogService.create(createBlogDto);
    }

    @Public()
    @Get()
    findAll() {
        return this.blogService.findAll();
    }

    @Public()
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.blogService.findOne(+id);
    }

    @Patch(':id')
    @Roles(Role.ADMIN, Role.CONTRIBUTOR)
    @UseInterceptors(FileInterceptor('image'))
    async update(
        @Param('id') id: string,
        @UploadedFile() file: Express.Multer.File,
        @Body() updateBlogDto: UpdateBlogDto
    ) {
        if (file) {
            const result = await this.cloudinaryService.uploadImage(file.path);
            if ('secure_url' in result) {
                updateBlogDto.image_url = result.secure_url;
            }
        }
        return this.blogService.update(+id, updateBlogDto);
    }

    @Delete(':id')
    @Roles(Role.ADMIN)
    remove(@Param('id') id: string) {
        return this.blogService.remove(+id);
    }
}
