import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ContentService } from './content.service';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { Public } from '../auth/guards/public';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../enums/role.enum';

@Public()
@Controller('content')
export class ContentController {
    constructor(private readonly contentService: ContentService) { }

    @Post()
    @Roles(Role.ADMIN)
    create(@Body() createContentDto: CreateContentDto) {
        return this.contentService.create(createContentDto);
    }

    @Public()
    @Get()
    findAll() {
        return this.contentService.findAll();
    }

    @Public()
    @Get('page/:pageName')
    findByPage(@Param('pageName') pageName: string) {
        return this.contentService.findByPage(pageName);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.contentService.findOne(+id);
    }

    @Patch(':id')
    @Roles(Role.ADMIN)
    update(@Param('id') id: string, @Body() updateContentDto: UpdateContentDto) {
        return this.contentService.update(+id, updateContentDto);
    }

    @Delete(':id')
    @Roles(Role.ADMIN)
    remove(@Param('id') id: string) {
        return this.contentService.remove(+id);
    }
}
