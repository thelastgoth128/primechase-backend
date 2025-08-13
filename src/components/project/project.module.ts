import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { CategoryModule } from '../category/category.module';
import { UserModule } from '../user/user.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Project]),CategoryModule,UserModule,
  ],
  controllers: [ProjectController],
  providers: [ProjectService],
  exports:[TypeOrmModule]
})
export class ProjectModule {}
