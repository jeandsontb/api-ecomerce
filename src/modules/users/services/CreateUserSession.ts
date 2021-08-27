import { getCustomRepository } from 'typeorm';
import MessageError from '@shared/errors/MessageError';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import authConfig from '@config/auth';

interface RequestUser {
  email: string;
  password: string;
}

interface ResponseUser {
  user: User;
  token: string;
}

class CreateUserSession {
  public async execute({
    email,
    password,
  }: RequestUser): Promise<ResponseUser> {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new MessageError('Incorrect email | password combination.', 401);
    }

    const comparePassword = await compare(password, user.password);

    if (!comparePassword) {
      throw new MessageError('Incorrect email | password combination.', 401);
    }

    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return { user, token };
  }
}

export default CreateUserSession;
