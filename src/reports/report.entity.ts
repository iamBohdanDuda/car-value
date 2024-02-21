import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Make } from '../makes/make.entity';
import { Model } from '../models/model.entity';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  approved: boolean;

  @Column()
  price: number;

  @Column()
  year: number;

  @Column()
  mileage: number;

  @Column()
  lng: number;

  @Column()
  lat: number;

  @ManyToOne(() => User, (user) => user.reports)
  user: User;

  @Column({ type: 'int' })
  makeId: number;

  @ManyToOne(() => Make, (make) => make.reports)
  @JoinColumn({ name: 'makeId' })
  make: Make;

  @ManyToOne(() => Model, (model) => model.reports)
  model: Model;
}
