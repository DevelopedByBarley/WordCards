"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFiles = void 0;
const fs = require('fs');
const deleteFiles = (fileNames) => {
    // Ha a fileNames egy string, alakítsuk át egyetlen elemű tömbbé
    if (typeof fileNames === 'string') {
        fileNames = [fileNames];
    }
    // Ha fileNames egy tömb
    if (Array.isArray(fileNames)) {
        // Végigiterálunk az összes fájlnéven
        fileNames.forEach((fileName) => {
            const filePath = "./src/public/images/" + fileName;
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error('Error deleting file:', err);
                    return;
                }
                console.log('File deleted successfully:', fileName);
            });
        });
    }
    else {
        console.error('Error: fileNames is not a string or an array');
    }
};
exports.deleteFiles = deleteFiles;
/*
Example
app.post('/image', upload.single('image'), (req: Request, res: Response) => {
  deleteFiles('filename' | [filenames]);
}) */ 
