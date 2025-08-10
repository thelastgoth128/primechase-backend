import { BadRequestException, Injectable, NotFoundException, Req } from '@nestjs/common';
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
  //admin
  async findAll() {
    return await this.projectrep.find()
  }
  //users projects
  async findAllByUser(@Req() req:Request) {
    const userid = req.user?.userid
    if(!userid){
      throw new NotFoundException("User not found")
    }
    const user = await this.userService.findOne(userid)


    return await this.projectrep.find({where: {client_email:user?.email}})
  }

  async findOne(id: number) {
    return await this.projectrep.findOne({where: {id:id}})
  }

  async update(id: number, updateProjectDto: UpdateProjectDto, @Req() req:Request) {
    const project = await this.projectrep.findOne({where: {id}})
    if (!project){
      throw new NotFoundException("Project not found")
    }
    Object.assign(project, updateProjectDto)
    return{
      message:"Successfully updated"
    }
  }

  async remove(id: number) {
    const project = await this.projectrep.findOne({where:{id}})
    if (!project){
      throw new NotFoundException("project not found")
    }
    await this.projectrep.delete(id)
    return{
      message: "Successfully deleted Project"
    }
  }
}
