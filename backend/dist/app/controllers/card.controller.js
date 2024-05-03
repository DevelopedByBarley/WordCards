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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.destroy = exports.index = exports.store = void 0;
const Card_1 = require("../models/Card");
const Theme_1 = __importDefault(require("../models/Theme"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req;
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limit = 2;
    try {
        const allCards = yield (0, Card_1.getCardsByUserId)(user._id);
        const cards = yield (0, Card_1.getCardsByUserIdWithPaginate)(user._id, page, limit);
        const pages = Math.ceil(allCards.length / limit);
        return res.status(200).json({
            status: true,
            message: "Get cards successfully!",
            data: cards,
            numOfPage: pages,
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
    const { word, translate, sentence, themeId } = parsedData;
    try {
        const savedCard = yield (0, Card_1.createCard)({
            word: word.toLowerCase(),
            translate: translate.toLowerCase(),
            sentence: replaceWordInSentence(translate.toLowerCase(), sentence.toLowerCase()),
            expires: Date.now() + (24 * 60 * 60 * 1000), // Az aktuális időpont + 1 nap
            user: user._id,
            theme: themeId,
            lang: lang,
        });
        yield Theme_1.default.findOneAndUpdate({ _id: themeId }, // needs card id!
        { $push: { cards: savedCard._id } });
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
const destroy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cardId = req.params.id;
        // Keresd meg a Theme-et, amelynek a cards tömbje tartalmazza a kártyát
        const theme = yield Theme_1.default.findOne({ cards: cardId });
        // Ellenőrizd, hogy találtál-e megfelelő Theme-et
        if (theme) {
            // Töröld a kártyát
            yield (0, Card_1.deleteCardById)(cardId);
            // Frissítsd a Theme-et, hogy eltávolítsd belőle a kártyát
            yield Theme_1.default.findOneAndUpdate({ _id: theme._id }, { $pull: { cards: cardId } });
            // Küldj választ a kliensnek, hogy sikeres volt-e a törlés
            res.status(200).json({
                status: true,
                message: "Card deleted successfully!",
                cardId: cardId
            });
        }
        else {
            // Ha nem találtál megfelelő Theme-et, küldj hibát a kliensnek
            res.status(404).json({
                status: false,
                message: "Theme not found for the given cardId"
            });
        }
    }
    catch (error) {
        // Hibakezelés
        console.error("Card deleting error:", error);
        res.status(500).json({
            status: false,
            message: "Card deleting error!"
        });
    }
});
exports.destroy = destroy;
function replaceWordInSentence(translate, sentence) {
    var replacement = "_".repeat(translate.length);
    return sentence.replace(translate, replacement);
}
