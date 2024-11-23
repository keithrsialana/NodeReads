import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  _id: unknown;
  username: string;
  email: string,
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    const secretKey = process.env.JWT_SECRET_KEY || '';

    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.sendStatus(403); // Forbidden
      }

      req.user = user as JwtPayload;
      return next();
    });
  } else {
    res.sendStatus(401).json({ message: 'Unauthorized' }); // Unauthorized
  }
};

export const signToken = (username: string, email: string, _id: unknown) => {
  const payload = { username, email, _id };
  const secretKey = process.env.JWT_SECRET_KEY || '';

  try {
    return jwt.sign(payload, secretKey, { expiresIn: '1h' });
  } catch (error) {
    console.log(`Token error: SK(${secretKey}):`, error)
    return null;

  }
};

// GraphQL specific middleware
export const contextMiddleware = (req:Request) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    const secretKey = process.env.JWT_SECRET_KEY || '';

    try {
      const user = jwt.verify(token, secretKey) as JwtPayload;
      return { user }; // Add user to context
    } catch (err) {
      throw new Error('Authentication token is invalid or expired.');
    }
  }
  return {};
};
