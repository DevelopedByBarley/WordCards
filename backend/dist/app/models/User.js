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
exports.deleteUserById = exports.createUser = exports.getUserByEmail = exports.getUserById = exports.getUsers = void 0;
const mongoose = require('mongoose');
const { Schema } = mongoose;
const userSchema = new Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    capacity: {
        type: Number,
        required: true,
    },
    password: String,
    themes: [{
            type: Schema.Types.ObjectId,
            ref: "Theme"
        }],
    cardsForRepeat: [],
}, { timestamps: true });
const User = mongoose.model('User', userSchema);
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () { return yield User.find(); });
exports.getUsers = getUsers;
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () { return yield User.findById(id); });
exports.getUserById = getUserById;
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () { return yield User.findOne({ email: email }); });
exports.getUserByEmail = getUserByEmail;
const createUser = (values) => __awaiter(void 0, void 0, void 0, function* () {
    return yield User.create(values);
});
exports.createUser = createUser;
const deleteUserById = (id) => __awaiter(void 0, void 0, void 0, function* () { return yield User.findOneAndDelete({ _id: id }); });
exports.deleteUserById = deleteUserById;
