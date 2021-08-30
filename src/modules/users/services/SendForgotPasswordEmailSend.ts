import MessageError from '@shared/errors/MessageError';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import UserTokensRepository from '../typeorm/repositories/UserTokensRepository';
import EtherealMail from '@config/mail/EtherealMail';

type RequestUser = {
  email: string;
};

class SendForgotPasswordEmailSend {
  public async execute({ email }: RequestUser): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);
    const userTokenRepository = getCustomRepository(UserTokensRepository);

    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new MessageError('User does not exists');
    }

    const { token } = await userTokenRepository.generate(user.id);

    //console.log(token);

    await EtherealMail.sendEmail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[Ecomerce] Recuperação de senha',
      templateData: {
        template: `Olá {{name}}: {{token}}`,
        variables: {
          name: user.name,
          token,
        },
      },
    });
  }
}

export default SendForgotPasswordEmailSend;
