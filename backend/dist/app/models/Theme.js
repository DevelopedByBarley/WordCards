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
exports.createTheme = exports.getThemesByUserIdWithPaginate = exports.createOtherThemeByUser = exports.getThemesByUserId = void 0;
const mongoose = require('mongoose');
const { Schema } = mongoose;
const themeSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
    },
    color: {
        type: String,
        required: true
    },
    lang: {
        type: String,
        required: true
    },
    user: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    cards: [{
            type: Schema.Types.ObjectId,
            ref: "Card"
        }]
});
const Theme = mongoose.model('Theme', themeSchema);
exports.default = Theme;
const getThemesByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Theme.find({
        user: userId
    });
});
exports.getThemesByUserId = getThemesByUserId;
const createOtherThemeByUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Theme.create({
        lang: 'En',
        name: 'Egyéb',
        description: 'Egyéb téma bármely kártyának',
        color: 'bg-gray-900',
        user: userId
    });
});
exports.createOtherThemeByUser = createOtherThemeByUser;
const getThemesByUserIdWithPaginate = (userId, page, limit) => __awaiter(void 0, void 0, void 0, function* () {
    if (page) {
        const skip = (page - 1) * limit; // Az ugrás értéke az oldalszám és az oldalankénti elemek szorzata
        const themes = yield Theme.find({ user: userId }).skip(skip).limit(limit); // Az adatbázisból csak az adott oldalhoz tartozó elemek kerülnek lekérdezésre
        return themes;
    }
});
exports.getThemesByUserIdWithPaginate = getThemesByUserIdWithPaginate;
const createTheme = (values) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Theme.create(values);
});
exports.createTheme = createTheme;
