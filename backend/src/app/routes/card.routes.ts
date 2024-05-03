import { Router } from "express";
import { index, store, destroy } from "../controllers/card.controller";
import { upload } from "../middlewares/multer";
import { authenticateToken } from "../middlewares/authenticateToken";


const router = Router();


router.get('/', authenticateToken, index);
router.delete('/:id', authenticateToken, destroy);
router.post('/store', authenticateToken, upload.single('file'), store);


export { router as cardRouter };