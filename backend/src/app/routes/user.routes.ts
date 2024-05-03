import { Router } from "express";
import { all, destroy, index, login, logout, store } from "../controllers/user.controller";
import { authenticateToken } from "../middlewares/authenticateToken";

const router = Router();

router.get('/', authenticateToken, all);
router.post('/register', store);
router.post('/login', login);
router.get('/logout', authenticateToken, logout);
router.delete('/:id', authenticateToken, destroy);
router.get('/index', authenticateToken, index);


export { router as userRouter };