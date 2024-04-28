import { Response, Request } from "express";

const welcome = (req: Request, res: Response) => {
  res.status(200).json({
    title: 'Welcome to node mvc server!',
    status: true
  });
}


export { welcome }