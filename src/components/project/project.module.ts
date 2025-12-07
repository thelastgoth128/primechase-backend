import { forwardRef, Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { UserModule } from '../user/user.module';
import { CategorysModule } from '../categorys/categorys.module';
import { ImageModule } from '../image/image.module';
import { Category } from '../categorys/entities/category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project, Category]), forwardRef(() => CategorysModule), UserModule, forwardRef(() => ImageModule)
  ],
  controllers: [ProjectController],
  providers: [ProjectService],
  exports: [TypeOrmModule, ProjectService]
})
export class ProjectModule { }
