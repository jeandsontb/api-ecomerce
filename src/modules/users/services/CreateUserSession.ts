import { getCustomRepository } from 'typeorm';
import MessageError from '@shared/errors/MessageError';
import { compare } from 'bcryptjs';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';

interface RequestUser {
  email: string;
  password: string;
}

// interface ResponseUser {
//   user: User;
// }

class CreateUserSession {
  public async execute({ email, password }: RequestUser): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new MessageError('Incorrect email | password combination.', 401);
    }

    const comparePassword = await compare(password, user.password);

    if (!comparePassword) {
      throw new MessageError('Incorrect email | password combination.', 401);
    }

    return user;
  }
}

export default CreateUserSession;
