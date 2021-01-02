import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

import { ParserStrategiesEnum } from '../common/enums/parserStrategies.enum';

@Entity()
export class ProxySource {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  url: string;

  @Column({
    type: "enum",
    enum: ParserStrategiesEnum,
    default: ParserStrategiesEnum.allInOneElement,
  })
  parserStrategy: ParserStrategiesEnum;

  @Column()
  hostSelector: string;

  @Column()
  portSelector: string;

  @Column()
  parentElementSelector?: string;

  @Column()
  typeSelector?: string;

  @Column()
  countrySelector?: string;

  @CreateDateColumn()
  createTime: string;

}