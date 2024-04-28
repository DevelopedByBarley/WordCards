
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';


function generateAccessToken(userId: string) {
  const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

  if (!accessTokenSecret) return false;
  return jwt.sign({ userId: userId }, accessTokenSecret, { expiresIn: '15m' });
}

function generateRefreshToken(userId: string) {
  const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

  if (!refreshTokenSecret) return false;
  return jwt.sign({ userId: userId }, refreshTokenSecret, { expiresIn: '2w' });
}

const token = async (req: Request, res: Response) => {

  let refreshToken;
  const cookie = req.headers.cookie;
  const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

  if (!refreshTokenSecret) return false;

  try {
    if (cookie) {
      refreshToken = cookie
        .split('; ')
        .find(cookie => cookie.startsWith('refreshToken='))
        ?.split('=')[1];
    }

    if (refreshToken == null) return res.sendStatus(401);

    jwt.verify(refreshToken, refreshTokenSecret, async (err, decodedToken) => {
      if (err) return res.sendStatus(403);

      type DataType = Record<string, any> | null;
      // Decoded token is now an object
      const data = decodedToken as DataType;

      // Assuming data.userId exists
      const accessToken = await generateAccessToken(data?.userId);
      res.json({ accessToken: accessToken });
    });
  } catch (error) {
    console.error('Error occurred in token handler', error);
    res.status(500).json({
      status: false,
      message: 'Internal server error',
    });
  }
};





export default token;



export {
  generateAccessToken,
  generateRefreshToken,
  token
}