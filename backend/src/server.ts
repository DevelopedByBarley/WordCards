import dotenv from 'dotenv';
dotenv.config();


import express from 'express'
import { app_config } from './config/app.config.js'
import bodyParser from 'body-parser';
import { connect } from './db/connect';
import { welcomeRouter } from './app/routes/welcome.routes'
import { userRouter } from './app/routes/user.routes';
import { cardRouter } from './app/routes/card.routes';
import token from './app/helpers/generateToken.js';
import { authenticateToken } from './app/middlewares/authenticateToken.js';
import { themeRouter } from './app/routes/theme.routes.js';
import path from 'path';

const app = express();
const port = process.env.PORT;



if (process.env.NODE_ENV === 'production') {
  // Ha a NODE_ENV production, a Vite build könyvtárát szolgálja ki
  app.use(express.static(path.resolve(__dirname, '..', '..', 'frontend', 'dist')));
  // Minden egyéb útvonal esetén visszaadja az index.html fájlt
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', '..', 'frontend', 'dist', 'index.html'));
  });
}

app.use(express.static('public'))
app.use(bodyParser.json());

app.use('/get-token', token);
if (app_config.authPerm === 1) app.use('/users', userRouter);
app.use('/cards', cardRouter);
app.use('/themes', themeRouter);


connect();
app.listen(port, () => console.log(`App is listening on port ${port}`))