import { Router } from "express";
import { authenticateToken } from "../middlewares/authenticateToken";
import { all, store } from "../controllers/theme.controller";

const router = Router();

router.get('/', authenticateToken, all);
router.post('/store', authenticateToken, store);


export { router as themeRouter };