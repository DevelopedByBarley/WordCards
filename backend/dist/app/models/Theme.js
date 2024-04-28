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
exports.createTheme = void 0;
const mongoose = require('mongoose');
const { Schema } = mongoose;
const themeSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
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
module.exports = Theme;
const createTheme = (values) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Theme.create(values);
});
exports.createTheme = createTheme;
