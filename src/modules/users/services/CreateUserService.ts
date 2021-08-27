import { getCustomRepository } from 'typeorm';
import MessageError from '@shared/errors/MessageError';
import { hash } from 'bcryptjs';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';

type RequestUser = {
  name: string;
  email: string;
  password: string;
};

class CreateUserService {
  public async execute({ name, email, password }: RequestUser): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const emailExists = await usersRepository.findByEmail(email);
    if (emailExists) {
      throw new MessageError('Email address already used');
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
