import MessageError from '@shared/errors/MessageError';
import { getCustomRepository } from 'typeorm';
import { isAfter, addHours } from 'date-fns';
import { hash } from 'bcryptjs';

import UsersRepository from '../typeorm/repositories/UsersRepository';
import UserTokensRepository from '../typeorm/repositories/UserTokensRepository';

type RequestUser = {
  token: string;
  password: string;
};

class ResetPasswordService {
  public async execute({ token, password }: RequestUser): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);
    const userTokenRepository = getCustomRepository(UserTokensRepository);

    const userToken = await userTokenRepository.findByToken(token);

    if (!userToken) {
      throw new MessageError('User Token does not exists');
    }

    const user = await usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new MessageError('User does not exists');
    }

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new MessageError('Token expired.');
    }

    user.password = await hash(password, 8);

    await usersRepository.save(user);
  }
}

export default ResetPasswordService;
