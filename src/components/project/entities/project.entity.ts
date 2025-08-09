import { Category } from "src/components/category/entities/category.entity";
import { Status } from "src/components/enums/status.ennum";
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
    style_reference: string

    @Column()
    color_preferences: string[]

    @Column()
    font_preferences: string

    @Column()
    image_url: string

    @Column()
    start_date: Date

    @Column()
    due_date: Date

    @Column()
    client_name: string

    @Column()
    client_email: string

    @Column({
        type:'enum',
        enum:Status,
        default:Status.pending,
    })
    status: string

    @Column()
    rejection_reason: string

    @ManyToOne(()=>Category,category=>category.project_id)
    @JoinColumn({name: 'category_id'})
    category_id: number

    @Column()
    created_at: Date
}
