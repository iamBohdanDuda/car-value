import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Report } from '../reports/report.entity';
import { Model } from '../models/model.entity';

@Entity()
export class Make {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Report, (report) => report.make)
  reports: Report[];

  @OneToMany(() => Model, (model) => model.make)
  models: Model[];
}
