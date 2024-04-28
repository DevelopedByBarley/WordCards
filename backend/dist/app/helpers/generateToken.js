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
exports.token = exports.generateRefreshToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function generateAccessToken(userId) {
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
    if (!accessTokenSecret)
        return false;
    return jsonwebtoken_1.default.sign({ userId: userId }, accessTokenSecret, { expiresIn: '15m' });
}
exports.generateAccessToken = generateAccessToken;
function generateRefreshToken(userId) {
    const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
    if (!refreshTokenSecret)
        return false;
    return jsonwebtoken_1.default.sign({ userId: userId }, refreshTokenSecret, { expiresIn: '2w' });
}
exports.generateRefreshToken = generateRefreshToken;
const token = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let refreshToken;
    const cookie = req.headers.cookie;
    const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
    if (!refreshTokenSecret)
        return false;
    try {
        if (cookie) {
            refreshToken = (_a = cookie
                .split('; ')
                .find(cookie => cookie.startsWith('refreshToken='))) === null || _a === void 0 ? void 0 : _a.split('=')[1];
        }
        if (refreshToken == null)
            return res.sendStatus(401);
        jsonwebtoken_1.default.verify(refreshToken, refreshTokenSecret, (err, decodedToken) => __awaiter(void 0, void 0, void 0, function* () {
            if (err)
                return res.sendStatus(403);
            // Decoded token is now an object
            const data = decodedToken;
            // Assuming data.userId exists
            const accessToken = yield generateAccessToken(data === null || data === void 0 ? void 0 : data.userId);
            res.json({ accessToken: accessToken });
        }));
    }
    catch (error) {
        console.error('Error occurred in token handler', error);
        res.status(500).json({
            status: false,
            message: 'Internal server error',
        });
    }
});
exports.token = token;
exports.default = token;
