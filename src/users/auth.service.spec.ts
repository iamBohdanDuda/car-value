import { AuthService } from './auth.service';
import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { randomBytes } from 'crypto';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from '../config';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {
    // Create a fake copy of the users service
    const users: User[] = [];
    fakeUsersService = {
      findByEmail: (email: string) => {
        const user = users.find((user) => user.email === email);
        return Promise.resolve(user);
      },
      create: (email: string, password: string) => {
        const user = {
          id: Math.floor(Math.random() * 999999),
          email,
          password,
        } as User;
        users.push(user);
        return Promise.resolve(user);
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [configuration],
        }),
      ],
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  it('can create an instance of auth service', async () => {
    expect(service).toBeDefined();
  });

  describe('singUp', () => {
    it('creates a new user with a salted and hashed password', async () => {
      const { password } = await service.signUp('asdf@asdf.com', 'asdf');

      expect(password).not.toEqual('asdf');
      expect(password).toBeDefined();
      expect(password.length).toBe(80);
    });

    it('throws an error if user signs up with email that is in use', async () => {
      await service.signUp('asdf@asdf.com', 'asdf');
      await expect(service.signUp('asdf@asdf.com', 'asdf')).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('signIn', () => {
    it('throws an error if user signs in but email is wrong', async () => {
      await expect(service.signIn('asdfg@asdf.cvb', 'asdfg')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('throws an error if user signs in but password is wrong', async () => {
      await service.signUp('test2@mail.com', 'pass');
      await expect(service.signIn('test2@mail.com', 'wrong')).rejects.toThrow(
        BadRequestException,
      );
    });

    it('returns user if credentials are right', async () => {
      const testEmail = 'test3@mail.com';
      const storedUser = await service.signUp(testEmail, 'letmein');
      const user = await service.signIn(testEmail, 'letmein');
      expect(user).toBeDefined();
      expect(user).toEqual({
        id: storedUser.id,
        email: testEmail,
        password: storedUser.password,
      });
    });
  });

  describe('hashPassword', () => {
    it('hashes the password', async () => {
      const password = await service.hashPassword(
        'pass',
        randomBytes(8).toString('hex'),
      );
      expect(password.length).toBe(64);
    });
  });
});
