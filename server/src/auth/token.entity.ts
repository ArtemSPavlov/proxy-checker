import { User } from '../user/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Token{
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => User)
    @JoinColumn()
    user: User;

    @Column({type: "varchar" })
    token: string;

    @CreateDateColumn()
    createTime: string;
}