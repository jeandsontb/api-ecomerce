import { Request, Response } from 'express';
import CreateUserSession from '../services/CreateUserSession';

export default class SessionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const userSession = new CreateUserSession();

    const user = await userSession.execute({
      email,
      password,
    });

    return res.json(user);
  }
}
