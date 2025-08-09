import { Category } from "src/components/category/entities/category.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Project {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    description: string

    @Column()
    image_url: string

    @Column()
    client_name: string

    @ManyToOne(()=>Category,category=>category.project_id)
    @JoinColumn({name: 'category_id'})
    category_id: number

    @Column()
    created_at: Date
}
