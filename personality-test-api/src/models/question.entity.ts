import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Question {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    question: string;

    @Column()
    dimension: string;

    @Column()
    direction: number;

    @Column({ length: 1 })
    meaning: string;
}
