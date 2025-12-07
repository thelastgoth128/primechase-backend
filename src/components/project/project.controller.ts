import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import type { Request } from 'express';
import { Public } from '../auth/guards/public';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '../services/cloudinary.service';

@Public()
@Controller('project')
export class ProjectController {
  constructor(
    private readonly projectService: ProjectService,
    private readonly cloudinaryService: CloudinaryService
  ) { }

  @Post('create')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'image', maxCount: 1 },
    { name: 'gallery', maxCount: 10 },
  ]))
  async create(
    @UploadedFiles() files: { image?: Express.Multer.File[], gallery?: Express.Multer.File[] },
    @Body() createProjectDto: CreateProjectDto,
    @Req() request: Request
  ) {
    if (files?.image?.[0]) {
      const result = await this.cloudinaryService.uploadImage(files.image[0].path);
      // Cast result to any to access generic properties if needed, or check type
      if ('secure_url' in result) {
        createProjectDto.image_url = result.secure_url;
      }
    }
    if (files?.gallery) {
      createProjectDto.gallery = [];
      for (const file of files.gallery) {
        const result = await this.cloudinaryService.uploadImage(file.path);
        if ('secure_url' in result) {
          createProjectDto.gallery.push(result.secure_url);
        }
      }
    }
    return this.projectService.create(createProjectDto, request);
  }

  @Get()
  findAll() {
    return this.projectService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectService.findOne(+id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(+id, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectService.remove(+id);
  }
}
