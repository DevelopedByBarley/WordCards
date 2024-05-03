import { Response, Request, ErrorRequestHandler } from "express";
import { createUser, deleteUserById, getUserByEmail, getUserById, getUsers } from "../models/User";
import { generateAccessToken, generateRefreshToken } from "../helpers/generateToken";
import bcrypt from 'bcrypt'
import { setCardsForRepeat } from "../helpers/setCardsForRepeat";
import Card from "../models/Card";
import { createOtherThemeByUser } from "../models/Theme";

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

  await setCardsForRepeat(userId);

  try {
    const user = await getUserById(userId);
    if (!user) return res.status(404).json({ message: 'User not found', status: false });

    user.cardsForRepeat = await Card.find({
      user: user._id,
      repeat: true
    }).exec();

    user.currentCapacity = await checkCapacity(userId, user.capacity);

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




const logout = async (req: Request, res: Response) => {
  try {
    // Töröljük a refresh token-t a kliens cookie-jából
    res.clearCookie('refreshToken');

    res.status(200).json({
      status: true,
      message: 'User successfully logged out.',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
    });
  }
};




async function checkCapacity(userId: string, capacity: number) {


  // Mai nap kezdetének dátuma (év-hónap-nap 00:00:00 órával)
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  // Mai nap vége dátuma (év-hónap-nap 23:59:59.999 órával)
  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999);

  // Keresés a kártyák között, amelyek a mai napon lettek létrehozva
  const cards = await Card.find({
    user: userId,
    createdAt: {
      $gte: startOfToday, // Nagyobb vagy egyenlő, mint a mai nap kezdete
      $lte: endOfToday    // Kisebb vagy egyenlő, mint a mai nap vége
    }
  });




  if ((cards.length !== 0) && capacity < cards.length) return false;
  return capacity - cards.length;
}

export { all, index, store, login, logout, destroy }