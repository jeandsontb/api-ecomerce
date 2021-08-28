import { getCustomRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import MessageError from '@shared/errors/MessageError';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import uploadConfig from '@config/upload';

type RequestAvatar = {
  userId: string;
  avatarFilename: string;
};

class UpdateUserAvatarService {
  public async execute({
    userId,
    avatarFilename,
  }: RequestAvatar): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findById(userId);

    if (!user) {
      throw new MessageError('User not found');
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarNameExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarNameExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
