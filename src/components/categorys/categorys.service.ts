import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { Project } from '../project/entities/project.entity';

@Injectable()
export class CategorysService {
  constructor(
    @InjectRepository(Category)
    private readonly catrep : Repository<Category>,
    @InjectRepository(Project)
    private readonly projectrep : Repository<Project>,
  ){}

  async create(createCategoryDto: CreateCategoryDto) {
    return await this.catrep.save(createCategoryDto)
  }

  async findAll() {
    return await this.catrep.find();
  }

  async findOne(id: number) {
    return await this.catrep.findOne({where: {id}});
  }

  async findCategoryProjetcs(id : number){
    const category = await this.catrep.findOne({where: {id}})
    if(!category) {
      throw new NotFoundException("Category not found");
    }
    
    const projects = await this.projectrep.find({where: {category: {id : category.id}}})

    return projects
  }

  async findCategoriesWithAProject() {
    const categories = await this.catrep.find()

    const result = await Promise.all(categories.map(async category => {
      const project = await this.projectrep.findOne({where: { category: {id: category.id}}});

      return {
        category:{
          id: category.id,
          name: category.name,
        },
        project: project || null,
      }
    }))
    return result
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.catrep.findOne({where: {id}})
    if(!category){
      throw new NotFoundException('category not found')
    }
    Object.assign(category, updateCategoryDto)

    return await this.catrep.save(category)
  }

  async remove(id: number) {
    return await this.catrep.delete(id)
  }
}
