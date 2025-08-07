import { Role } from "src/components/enums/role.enum";
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
        default:Role.CUSTOMER
    })
    role : Role

    @Column()
    created_at : Date

     @Column({nullable :true})
    reset_token: string | null

    @Column({nullable : true, type: 'timestamp',default:null})
    reset_token_expiry: Date | null
}
