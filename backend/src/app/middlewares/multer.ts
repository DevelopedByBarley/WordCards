import { Request } from "express";
import multer from "multer";
import path from 'path';

type DestinationCallback = (error: Error | null, destination: string) => void

const storage = multer.diskStorage({
  destination: function (req: Request, file: Express.Multer.File, cb: DestinationCallback) {
    cb(null, './src/public/images');
  },
  filename: function (req: Request, file: Express.Multer.File, cb: DestinationCallback) {
    console.log(file);

    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExtension = path.extname(file.originalname); // Fájl kiterjesztésének meghatározása
    cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension); // Fájl név összeállítása kiterjesztéssel
  }
});



const upload = multer({ storage: storage });

export { upload }


/* 
Example

app.post('/image', upload.single('image'), (req: Request, res: Response) => {}) 
*/