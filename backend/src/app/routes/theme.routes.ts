import { Router } from "express";
import { authenticateToken } from "../middlewares/authenticateToken";
import { index, store } from "../controllers/theme.controller";

const router = Router();

router.get('/', authenticateToken, index);
router.post('/store', authenticateToken, store);


export { router as themeRouter };