import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class BlogPost {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ type: 'text' })
    content: string;

    @Column({ nullable: true })
    image_url: string;

    @Column({ nullable: true })
    author: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ type: 'timestamp', nullable: true })
    updated_at: Date;
}
