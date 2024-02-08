import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repository: Repository<User>) {}

  create(email: string, password: string): Promise<User> {
    const user = this.repository.create({ email, password });

    return this.repository.save(user);
  }

  findOne(id: number): Promise<User> {
    if (!id) {
      throw new NotFoundException('user not found');
    }
    return this.repository.findOneBy({ id });
  }

  findByEmail(email: string): Promise<User> {
    return this.repository.findOneBy({ email });
  }

  async update(id: number, attributes: Partial<User>): Promise<User> {
    const user = await this.findOne(id);
    if (!user) throw new NotFoundException('user not found');
    Object.assign(user, attributes);
    return this.repository.save(user);
  }

  async delete(id: number): Promise<User> {
    const user = await this.findOne(id);
    if (!user) throw new NotFoundException('user not found');
    return this.repository.remove(user);
  }
}
