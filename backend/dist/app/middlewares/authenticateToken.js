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
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
const authenticateToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const secret = process.env.ACCESS_TOKEN_SECRET;
    if (!token) {
        return res.status(401).json({
            status: 'fail',
            message: 'Missing token. Please log in to continue.',
        });
    }
    if (!secret) {
        return res.status(500).json({
            status: 'fail',
            message: 'ACCESS_TOKEN_SECRET environment variable is missing.',
        });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        req.user = yield (0, User_1.getUserById)(decoded.userId);
        next();
    }
    catch (err) {
        return res.status(403).json({
            status: 'fail',
            message: 'Invalid token. Please log in again.',
        });
    }
});
exports.authenticateToken = authenticateToken;
