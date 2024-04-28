"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.welcome = void 0;
const welcome = (req, res) => {
    res.status(200).json({
        title: 'Welcome to node mvc server!',
        status: true
    });
};
exports.welcome = welcome;
