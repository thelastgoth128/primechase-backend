import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    userid : number

    @Column()
    name : string

    @Column()
    email : string

    @Column()
    password : string

    @Column({
        type: 'enum',
        enum: Role,
        default:Role.customer
    })
    role : Role

    @Column()
    created_at : Date
}
