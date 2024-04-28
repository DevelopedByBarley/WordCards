import { Router } from "express";
import { all, destroy, index, login, store } from "../controllers/user.controller";
import { authenticateToken } from "../middlewares/authenticateToken";

const router = Router();

router.get('/', authenticateToken, all);
router.post('/register', store);
router.post('/login', login);
router.delete('/:id', destroy);
router.get('/index', authenticateToken,index);


export { router as userRouter };