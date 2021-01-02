import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Token{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar", length: 128, unique: true })
    uuid: string;

    @Column({type: "varchar", length: 255 })
    token: string;
}