import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryColumn,
} from 'typeorm';

import { ProxyType } from '../common/enums/proxyType.enum';

@Entity()
export class Proxy {

    @Column({
        type: "enum",
        enum: ProxyType,
        default: ProxyType.HTTP,
    })
    type: ProxyType;

    @Column({default: false})
    private: boolean;

    @Column({default: false})
    isActive: boolean;

    @PrimaryColumn({type: "varchar", length: 255 })
    host: string;

    @PrimaryColumn({ type: "int", width: 200 })
    port: number;

    @Column({type: "varchar", length: 255, nullable: true })
    country: string;

    @Column({ type: "int", nullable: true })
    speed: number;

    @Column({ type: "int", nullable: true })
    latency: number;

    @UpdateDateColumn()
    updateTime: string;

    @CreateDateColumn()
    createTime: string;
}