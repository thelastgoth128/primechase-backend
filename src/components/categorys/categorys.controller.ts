import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategorysService } from './categorys.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Public } from '../auth/guards/public';

@Public()
@Controller('category')
export class CategorysController {
  constructor(
    private readonly categorysService: CategorysService
  ) {}

  @Post('create')
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categorysService.create(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.categorysService.findAll();
  }

  @Get(':id/projects')
  async findCategoryProjects(@Param('id') id :number) {
    return await this.categorysService.findCategoryProjetcs(id)
  }

  @Get('follow')
  async findCategoriesWithProject() {
    return await this.categorysService.findCategoriesWithAProject()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categorysService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categorysService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categorysService.remove(+id);
  }
}
