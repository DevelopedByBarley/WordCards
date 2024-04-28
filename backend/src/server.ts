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


const app = express();
const port = process.env.PORT;


app.use(express.static('public'))
app.use(bodyParser.json());

app.use('/get-token', token);
if (app_config.authPerm === 1) app.use('/users', userRouter);
app.use('/cards', cardRouter);


connect();
app.listen(port, () => console.log(`App is listening on port ${port}`))