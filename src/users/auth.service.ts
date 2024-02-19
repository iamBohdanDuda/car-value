import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { ConfigService } from '@nestjs/config';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private configService: ConfigService,
  ) {}

  async hashPassword(password: string, salt: string): Promise<string> {
    const hash = (await scrypt(
      password,
      salt,
      Number(this.configService.get<string>('hash_length')),
    )) as Buffer;
    return hash.toString('hex');
  }

  async signUp(email: string, password: string): Promise<User> {
    const user = await this.usersService.findByEmail(email);
    if (user) throw new BadRequestException('email already in use');

    const salt = randomBytes(
      Number(this.configService.get<string>('salt_length')),
    ).toString('hex');

    const result = salt + (await this.hashPassword(password, salt));

    return this.usersService.create(email, result);
  }

  async signIn(email: string, password: string): Promise<User> {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new NotFoundException('user not found');

    const salt = user.password.slice(0, 16);
    const storedHash = user.password.slice(16);

    if ((await this.hashPassword(password, salt)) !== storedHash)
      throw new BadRequestException('bad password');

    return user;
  }
}
