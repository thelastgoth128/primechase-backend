import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


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

    @Column()
    category_id: number

    @Column()
    created_at: Date
}
