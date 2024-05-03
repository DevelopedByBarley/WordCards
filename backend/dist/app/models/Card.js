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
exports.deleteCardById = exports.createCard = exports.getCardsByThemeId = exports.getCardsByUserIdWithPaginate = exports.getCardsByUserId = exports.getCards = void 0;
const mongoose = require('mongoose');
const { Schema } = mongoose;
const cardSchema = new Schema({
    word: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    translate: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    sentence: {
        type: String,
        required: true,
        lowercase: true
    },
    repeat: {
        type: Boolean,
        default: false,
    },
    state: {
        type: Number,
        default: 1,
        required: true
    },
    expires: {
        type: Date,
        required: true
    },
    lang: {
        required: true,
        type: String,
    },
    user: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    theme: {
        //    required: true,
        type: Schema.Types.ObjectId,
        ref: "Theme"
    },
}, { timestamps: true });
const Card = mongoose.model('Card', cardSchema);
exports.default = Card;
const getCards = () => __awaiter(void 0, void 0, void 0, function* () { return yield Card.find(); });
exports.getCards = getCards;
const getCardsByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Card.find({
        user: userId
    });
});
exports.getCardsByUserId = getCardsByUserId;
const getCardsByUserIdWithPaginate = (userId, page, limit) => __awaiter(void 0, void 0, void 0, function* () {
    const skip = (page - 1) * limit; // Az ugrás értéke az oldalszám és az oldalankénti elemek szorzata
    const cards = yield Card.find({ user: userId }).skip(skip).limit(limit); // Az adatbázisból csak az adott oldalhoz tartozó elemek kerülnek lekérdezésre
    return cards;
});
exports.getCardsByUserIdWithPaginate = getCardsByUserIdWithPaginate;
const getCardsByThemeId = (themeId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Card.find({
        themeId: themeId
    });
});
exports.getCardsByThemeId = getCardsByThemeId;
const createCard = (values) => __awaiter(void 0, void 0, void 0, function* () {
    const newCard = yield Card.create(values);
    return newCard;
});
exports.createCard = createCard;
const deleteCardById = (id) => __awaiter(void 0, void 0, void 0, function* () { return yield Card.findOneAndDelete({ _id: id }); });
exports.deleteCardById = deleteCardById;
