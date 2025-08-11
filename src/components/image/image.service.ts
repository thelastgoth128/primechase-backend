import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Project } from "../project/entities/project.entity";
import { Repository } from "typeorm";

@Injectable()
export class ImageService{
    constructor(
        @InjectRepository(Project)
        private readonly projectrep : Repository<Project>
    ){}

    async saveProjectImageUrl(id: number, imageUrl: string){
        const project = await this.projectrep.findOne({where: {id}})
        if (!project){
            throw new NotFoundException('project not found')
        }
        project.image_url =imageUrl
        await this.projectrep.save(project)
    }
}