import MessageError from '@shared/errors/MessageError';
import { getCustomRepository } from 'typeorm';
import { compare, hash } from 'bcryptjs';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';

interface RequestProfile {
  user_id: string;
  name: string;
  email: string;
  password?: string;
  old_password?: string;
}

class UpdateProfileService {
  public async execute({
    user_id,
    name,
    email,
    password,
    old_password,
  }: RequestProfile): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new MessageError('User not found');
    }

    const userUpdateEmail = await usersRepository.findByEmail(email);

    if (userUpdateEmail && userUpdateEmail.id !== user_id) {
      throw new MessageError('There is already one user with this email.');
    }

    if (password && !old_password) {
      throw new MessageError('Old password is required');
    }

    if (password && old_password) {
      const checkedOldPassword = await compare(old_password, user.password);

      if (!checkedOldPassword) {
        throw new MessageError('Old password does not match.');
      }

      user.password = await hash(password, 8);
    }

    user.name = name;
    user.email = email;

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateProfileService;
