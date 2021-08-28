import { Request, Response } from 'express';
import SendForgotPasswordEmailSend from '../services/SendForgotPasswordEmailSend';

export default class ForgotPasswordController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;

    const sendForgotPasswordEmail = new SendForgotPasswordEmailSend();

    await sendForgotPasswordEmail.execute({
      email,
    });

    return res.status(204).json();
  }
}
