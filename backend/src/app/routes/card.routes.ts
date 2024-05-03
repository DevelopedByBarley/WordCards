import { Router } from "express";
import { all, store, destroy, index, update } from "../controllers/card.controller";
import { upload } from "../middlewares/multer";
import { authenticateToken } from "../middlewares/authenticateToken";


const router = Router();


router.get('/', authenticateToken, all);
router.get('/:cardId', authenticateToken, index);

router.post('/store', authenticateToken, upload.single('file'), store);

router.delete('/:id', authenticateToken, destroy);
router.put('/:cardId', authenticateToken, upload.single('file'), update);



export { router as cardRouter };