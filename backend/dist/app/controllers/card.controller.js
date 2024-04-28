"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.index = exports.store = void 0;
const Card_1 = require("../models/Card");
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req;
    try {
        const cards = yield (0, Card_1.getCardsByUserId)(user._id);
        console.log(cards);
        return res.status(200).json({
            status: true,
            message: "Get cards successfully!",
            cards: cards
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            status: true,
            message: "Cards get fail!",
        });
    }
});
exports.index = index;
const store = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req;
    const lang = 'En';
    const parsedData = JSON.parse(req.body.data);
    const { word, translate, sentence } = parsedData;
    try {
        const savedCard = yield (0, Card_1.createCard)({
            word: word.toLowerCase(),
            translate: translate.toLowerCase(),
            sentence: replaceWordInSentence(translate.toLowerCase(), sentence.toLowerCase()),
            expires: Date.now() + (24 * 60 * 60 * 1000), // Az aktuális időpont + 1 nap
            user: user._id,
            //theme: theme,
            lang: lang,
        });
        /* await User.findOneAndUpdate(
          { _id: user._id },
          { $push: { cards: savedCard._id } }
        );
      
        await Theme.findOneAndUpdate(
          { _id: theme }, // needs card id!
          { $push: { cards: savedCard._id } }
        );
      */
        return res.status(200).json({
            status: true,
            message: "Card created successfully!",
            card: savedCard
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: "Something went wrong when the card is stored",
        });
    }
});
exports.store = store;
function replaceWordInSentence(translate, sentence) {
    var replacement = "_".repeat(translate.length);
    return sentence.replace(translate, replacement);
}
