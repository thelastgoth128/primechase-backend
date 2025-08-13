import { Category } from "src/components/categorys/entities/category.entity";
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

    @Column({ nullable: true })
    style_reference: string

    @Column('text',{array: true,nullable: true},)
    color_preferences: string[]

    @Column({nullable: true})
    font_preferences: string

    @Column({nullable:true})
    image_url: string

    @Column({nullable : true})
    start_date: Date

    @Column({nullable: true})
    due_date: Date

    @Column({nullable: true})
    client_name: string

    @Column({nullable: true})
    client_email: string

    @Column({
        type:'enum',
        enum:Status,
        default:Status.pending,
        nullable:true
    })
    status: string

    @Column({nullable: true})
    rejection_reason: string

    @ManyToOne(()=>Category,category=>category.project_id)
    @JoinColumn({name: 'category_id'})
    category: Category

    @Column({nullable:true})
    created_at: Date
}
