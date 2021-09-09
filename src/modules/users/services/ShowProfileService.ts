import MessageError from '@shared/errors/MessageError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';

interface RequestProfile {
  user_id: string;
}

class ShowProfileService {
  public async execute({ user_id }: RequestProfile): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new MessageError('User not found');
    }

    return user;
  }
}

export default ShowProfileService;
