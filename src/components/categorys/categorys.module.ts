import { forwardRef, Module } from '@nestjs/common';
import { CategorysService } from './categorys.service';
import { CategorysController } from './categorys.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { ProjectModule } from '../project/project.module';
import { Project } from '../project/entities/project.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category, Project]), forwardRef(() => ProjectModule)
  ],
  controllers: [CategorysController],
  providers: [CategorysService],
  exports: [TypeOrmModule, CategorysService]
})
export class CategorysModule { }
