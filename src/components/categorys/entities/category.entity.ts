import { Project } from "src/components/project/entities/project.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Category{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string

    @OneToMany(()=>Project,project=>project.category)
    project_id: Category[]
}