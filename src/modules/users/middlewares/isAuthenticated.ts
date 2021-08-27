import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import MessageError from '@shared/errors/MessageError';
import authConfig from '@config/auth';

export default function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const autHeader = req.headers.authorization;

  if (!autHeader) {
    throw new MessageError('JWT token is missing.');
  }

  const [, token] = autHeader.split(' ');

  try {
    const decodeToken = verify(token, authConfig.jwt.secret);

    return next();
  } catch {
    throw new MessageError('Invalid JWT Token');
  }
}
