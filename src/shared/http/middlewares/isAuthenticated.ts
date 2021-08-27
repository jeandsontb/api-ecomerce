import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import MessageError from '@shared/errors/MessageError';
import authConfig from '@config/auth';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

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
    const decodedToken = verify(token, authConfig.jwt.secret);

    const { sub } = decodedToken as TokenPayload;

    req.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new MessageError('Invalid JWT Token');
  }
}
