import { Response, Request, ErrorRequestHandler } from "express";
import { createUser, deleteUserById, getUserByEmail, getUserById, getUsers } from "../models/User";
import { generateAccessToken, generateRefreshToken } from "../helpers/generateToken";
import bcrypt from 'bcrypt'

const all = async (req: Request, res: Response) => {
  try {
    const users = await getUsers();

    if (users.length === 0) {
      return res.status(204).json({ message: 'No users found', status: false });
    }

    res.status(200).json({
      users,
      status: true
    });

  } catch (err) {

    console.error(err);
    res.status(500).json({
      status: false,
      message: 'Internal server error'
    });

  }
}

const index = async (req: Request, res: Response) => {
  const userId: string = (req as Record<string, any>).user._id;  
  
  try {
    const user = await getUserById(userId);
    if (!user) return res.status(404).json({ message: 'User not found', status: false });

    res.status(200).json({
      user,
      status: true
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: false,
      message: 'Internal server error'
    });
  }
}


const store = async (req: Request, res: Response) => {

  const { name, email, password, capacity } = req.body;
  const saltRounds = 10;

  console.log(password);


  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);


    await createUser({ name, email, password: hashedPassword, capacity })
    return res.status(200).json({
      status: true,
      message: "User created successfully!",
    })
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "User creating fail!",
    })
  }

}

const destroy = async (req: Request, res: Response) => {

  const userId = req.params.id;

  if (!userId) return res.status(400).json({ message: 'This is user Id is doesn\'t exist' });

  try {
    const user = await deleteUserById(userId);
    if (!user) return res.status(400).json({ message: 'This is user is doesn\'t exist' });

    res.status(200).json({
      userId,
      message: 'User deleted succesfully!',
      status: true
    });
  } catch (err) {
    console.error(err);
  }
}

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  
  console.log(email, password);
  

  try {
    const user: Record<string, any> | null = await getUserByEmail(email);
    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User doesn't exist in user.controller.login",
      });
    }

    // Ellenőrizzük a jelszót
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({
        status: false,
        message: "Wrong e-mail or password!",
      });
    }

    // Ha minden stimmel, generálunk egy refresh token-t és egy access token-t
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true, // Csak HTTPS-en keresztül engedélyezett
      maxAge: 24 * 60 * 60 * 1000 // 1 nap
    });


    res.status(200).json({
      status: true,
      token: accessToken
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }


};

export { all, index, store, login, destroy }