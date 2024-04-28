"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connect = () => {
    mongoose_1.default.connect(`mongodb+srv://Barley:${process.env.MONGO_PW}@cluster0.qtfsg.mongodb.net/`)
        .then(() => console.log('Database is connected successfully!'))
        .catch((err) => console.error(err));
};
exports.connect = connect;
