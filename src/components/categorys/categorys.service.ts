import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategorysService {
  constructor(
    @InjectRepository(Category)
    private readonly catrep : Repository<Category>,
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
