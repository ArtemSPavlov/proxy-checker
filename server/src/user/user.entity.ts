import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn, Generated, CreateDateColumn } from 'typeorm';
import { Roles } from './enums/roles.enum';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 1000 })
    login: string;

    @Column({ unique: true })
    @Generated("uuid")
    uuid: string;

    @Column({ type: "varchar", length: 1000, unique: true })
    email: string;

    @Exclude()
    @Column({ type: "varchar", length: 1000 })
    password: string;

    @Column({default: false})
    isActive: boolean;

    @Column({
        type: "enum",
        enum: Roles,
        default: Roles.user,
    })
    role: Roles

    @CreateDateColumn({type: "varchar", length: 1000 })
    createTime: string;
}