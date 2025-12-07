import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Inquiry {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column({ type: 'text' })
    message: string;

    @Column({ default: 'pending' })
    status: string; // e.g., 'pending', 'responded'

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
}
