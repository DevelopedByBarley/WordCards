import { Request, Response } from "express";
import { createCard, deleteCardById, getCardById, getCardsByUserId, getCardsByUserIdWithPaginate, updateCardById } from "../models/Card";
import Theme from "../models/Theme";



const index = async (req: Request, res: Response) => {

  const { cardId } = req.params;

  try {

    const card = await getCardById(cardId)

    return res.status(200).json({
      status: true,
      message: "Get cards successfully!",
      data: card,
    });
  } catch (error) {
    return res.status(500).json({
      status: true,
      message: "Cards get fail!",
    });
  }
}

const all = async (req: Request, res: Response) => {
  const { user }: Record<string, any> = req;
  const page = req.query.page ? parseInt(req.query.page as string) : 1;
  const limit = 10;

  try {
    const allCards = await getCardsByUserId(user._id)
    const cards = await getCardsByUserIdWithPaginate(user._id, page, limit);
    const pages = Math.ceil(allCards.length / limit);


    return res.status(200).json({
      status: true,
      message: "Get cards successfully!",
      data: cards,
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

  const parsedData = JSON.parse(req.body.data);
  const { word, translate, sentence, themeId } = parsedData;

  try {
    const savedCard = await createCard({
      word: word.toLowerCase(),
      translate: translate.toLowerCase(),
      sentence: replaceWordInSentence(translate.toLowerCase(), sentence.toLowerCase()),
      expires: Date.now() + (24 * 60 * 60 * 1000), // Az aktuális időpont + 1 nap
      user: user._id,
      theme: themeId,
      lang: lang,
    });

    await Theme.findOneAndUpdate(
      { _id: themeId }, // needs card id!
      { $push: { cards: savedCard._id } }
    );


    /* await User.findOneAndUpdate(
      { _id: user._id },
      { $push: { cards: savedCard._id } }
    );
  
  
  */
    return res.status(200).json({
      status: true,
      message: "Card created successfully!",
      card: savedCard
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "Something went wrong when the card is stored",
    });
  }

}






const destroy = async (req: Request, res: Response) => {
  try {

    const cardId = req.params.id;

    // Keresd meg a Theme-et, amelynek a cards tömbje tartalmazza a kártyát
    const theme = await Theme.findOne({ cards: cardId });


    // Ellenőrizd, hogy találtál-e megfelelő Theme-et
    if (theme) {
      // Töröld a kártyát
      await deleteCardById(cardId)
      // Frissítsd a Theme-et, hogy eltávolítsd belőle a kártyát
      await Theme.findOneAndUpdate(
        { _id: theme._id },
        { $pull: { cards: cardId } }
      );

      // Küldj választ a kliensnek, hogy sikeres volt-e a törlés
      res.status(200).json({
        status: true,
        message: "Card deleted successfully!",
        cardId: cardId
      });
    } else {
      // Ha nem találtál megfelelő Theme-et, küldj hibát a kliensnek
      res.status(404).json({
        status: false,
        message: "Theme not found for the given cardId"
      });
    }
  } catch (error) {
    // Hibakezelés
    console.error("Card deleting error:", error);
    res.status(500).json({
      status: false,
      message: "Card deleting error!"
    });
  }
};


const update = async (req: Request, res: Response) => {

  const { cardId } = req.params;
  const parsedData = JSON.parse(req.body.data);
  const { word, translate, sentence, themeId } = parsedData;
  const lang = 'En'


  try {
    const updatedCard = await updateCardById(cardId, {
      word: word.toLowerCase(),
      translate: translate.toLowerCase(),
      sentence: replaceWordInSentence(translate.toLowerCase(), sentence.toLowerCase()),
      theme: themeId,
      lang: lang,
    })

    await Theme.findOneAndUpdate(
      { cards: cardId }, // Keresési feltétel
      { $pull: { cards: cardId } }, // Törlés a tömbből
      { new: true } // Beállítás az új dokumentum lekérdezésére
    )

    await Theme.findOneAndUpdate(
      { _id: themeId }, // Keresési feltétel
      { $push: { cards: cardId } }, // Hozzáadás a tömbhöz
      { new: true } // Beállítás az új dokumentum lekérdezésére
    );

    return res.status(200).json({
      status: true,
      message: "Get cards successfully!",
      data: updatedCard,
    });
  } catch (err) {
    console.error(err)
  }
}

function replaceWordInSentence(translate: string, sentence: string) {
  var replacement = "_".repeat(translate.length);
  var regex = new RegExp("\\b" + translate + "\\b", "g"); // "\\b" jelzi a szóhatárt

  return sentence.replace(regex, replacement);

}





export { store, all, destroy, index, update }