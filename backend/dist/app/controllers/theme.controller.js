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
exports.store = exports.all = void 0;
const Theme_1 = require("../models/Theme");
const all = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req;
    const page = req.query.page ? parseInt(req.query.page) : null;
    const limit = 1;
    try {
        const allThemes = yield (0, Theme_1.getThemesByUserId)(user._id);
        if (allThemes.length === 0) {
            (0, Theme_1.createOtherThemeByUser)(user._id);
        }
        const themes = page ? yield (0, Theme_1.getThemesByUserIdWithPaginate)(user._id, page, limit) : allThemes;
        const pages = Math.ceil(allThemes.length / limit);
        return res.status(200).json({
            status: true,
            message: "Get cards successfully!",
            data: themes,
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
exports.all = all;
const store = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req;
    const lang = 'En';
    const { name, description, color } = req.body;
    try {
        const savedTheme = yield (0, Theme_1.createTheme)({
            name,
            description,
            color,
            lang,
            user: user._id
        });
        return res.status(200).json({
            status: true,
            message: "Card created successfully!",
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
