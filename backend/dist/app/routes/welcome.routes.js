"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.welcomeRouter = void 0;
const express_1 = require("express");
const welcome_controller_1 = require("../controllers/welcome.controller");
const router = (0, express_1.Router)();
exports.welcomeRouter = router;
router.get('/', welcome_controller_1.welcome);
