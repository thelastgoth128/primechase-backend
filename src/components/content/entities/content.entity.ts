import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Content {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    page: string; // e.g., 'home', 'about', 'services'

    @Column()
    section: string; // e.g., 'hero', 'contact_info'

    @Column()
    key: string; // e.g., 'title', 'subtitle', 'email'

    @Column('text')
    value: string; // The actual content
}
