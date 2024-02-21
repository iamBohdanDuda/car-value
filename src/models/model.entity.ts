import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Make } from '../makes/make.entity';
import { Report } from '../reports/report.entity';

@Entity()
export class Model {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'int' })
  makeId: number;

  @ManyToOne(() => Make, (make) => make.models)
  @JoinColumn({ name: 'makeId' })
  make: Make;

  @OneToMany(() => Report, (report) => report.model)
  reports: Report[];
}
