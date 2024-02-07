import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { Report } from '../reports/report.entity';

export default registerAs('database', (): TypeOrmModuleOptions => ({
  type: 'sqlite',
  database: process.env.DB_NAME,
  entities: [User, Report],
  synchronize: true
}));