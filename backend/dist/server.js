"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const app_config_js_1 = require("./config/app.config.js");
const body_parser_1 = __importDefault(require("body-parser"));
const connect_1 = require("./db/connect");
const user_routes_1 = require("./app/routes/user.routes");
const card_routes_1 = require("./app/routes/card.routes");
const generateToken_js_1 = __importDefault(require("./app/helpers/generateToken.js"));
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(express_1.default.static('public'));
app.use(body_parser_1.default.json());
app.use('/get-token', generateToken_js_1.default);
if (app_config_js_1.app_config.authPerm === 1)
    app.use('/users', user_routes_1.userRouter);
app.use('/cards', card_routes_1.cardRouter);
(0, connect_1.connect)();
app.listen(port, () => console.log(`App is listening on port ${port}`));
