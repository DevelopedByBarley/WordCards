import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { getUserById } from '../models/User';


type decodedTypes = {
  userId: string,
  iat: number,
  exp: number
}

const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  const secret = process.env.ACCESS_TOKEN_SECRET;

  if (!token) {
    return res.status(401).json({
      status: 'fail',
      message: 'Missing token. Please log in to continue.',
    });
  }

  if (!secret) {
    return res.status(500).json({
      status: 'fail',
      message: 'ACCESS_TOKEN_SECRET environment variable is missing.',
    });
  }

  try {
    const decoded = jwt.verify(token, secret) as decodedTypes;
    (req as Record<string, any | null>).user = await getUserById(decoded.userId);
    next();
  } catch (err) {
    return res.status(403).json({
      status: 'fail',
      message: 'Invalid token. Please log in again.',
    });
  }
};


export { authenticateToken };