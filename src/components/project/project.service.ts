import { Injectable, NotFoundException, Req } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';
import type { Request } from 'express';
import { UserService } from '../user/user.service';
import { NotFoundError } from 'rxjs';

@Injectable()
export class ProjectService {
  @InjectRepository(Project)
  private readonly projectrep : Repository<Project>
  private userService : UserService

  async create(createProjectDto: CreateProjectDto, @Req() req:Request) {
    const userid = req.user?.userid

    if (!userid) {
      throw new NotFoundException('user not found')
    }
    const user = await this.userService.findOne(userid)
    await this.projectrep.save(createProjectDto)
    return {
      message:'Project successfully created, waiting for admin to approve'
    }
  }

  async findAll() {
    return `This action returns all project`;
  }

  findOne(id: number) {
    return `This action returns a #${id} project`;
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
