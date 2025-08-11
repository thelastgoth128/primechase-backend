import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { CategoryModule } from '../category/category.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Project]),CategoryModule
  ],
  controllers: [ProjectController],
  providers: [ProjectService],
  exports:[TypeOrmModule]
})
export class ProjectModule {}
