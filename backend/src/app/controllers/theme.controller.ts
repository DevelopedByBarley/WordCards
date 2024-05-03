import { Request, Response } from "express";
import { createOtherThemeByUser, createTheme, getThemesByUserId, getThemesByUserIdWithPaginate } from "../models/Theme";





const all = async (req: Request, res: Response) => {
  const { user }: Record<string, any> = req;
  const page = req.query.page ? parseInt(req.query.page as string) : null;
  const limit = 10;

  try {
    const allThemes = await getThemesByUserId(user._id)
    
    if(allThemes.length === 0) {
     createOtherThemeByUser(user._id);
    }

    const themes = page ? await getThemesByUserIdWithPaginate(user._id, page, limit) : allThemes;
    const pages = Math.ceil(allThemes.length / limit);

    return res.status(200).json({
      status: true,
      message: "Get cards successfully!",
      data: themes,
      numOfPage: pages,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: true,
      message: "Cards get fail!",
    });
  }
}


const store = async (req: Request, res: Response) => {
  const { user }: Record<string, any> = req;
  const lang = 'En';

  const { name, description, color } = req.body;

  try {
    const savedTheme = await createTheme({
      name,
      description,
      color,
      lang,
      user: user._id
    })

    

    return res.status(200).json({
      status: true,
      message: "Card created successfully!",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "Something went wrong when the card is stored",
    });
  }

}

export {  all, store }