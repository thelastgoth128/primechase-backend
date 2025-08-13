import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { UserModule } from '../user/user.module';
import { CategorysModule } from '../categorys/categorys.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Project]),CategorysModule,UserModule,
  ],
  controllers: [ProjectController],
  providers: [ProjectService],
  exports:[TypeOrmModule]
})
export class ProjectModule {}
