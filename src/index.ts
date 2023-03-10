require('dotenv').config();
import morgan from 'morgan';
import indexRouter from './routes';
import express from 'express';
import http from 'http';
import cors from 'cors';
import { json } from 'body-parser';
import path from "path";
import {error404, errorHandling} from "./helpers/Utils";
const { PORT } = process.env;

const app = express();
app.use(cors());
app.use(json({}));
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(express.static(path.resolve('./csv')));
app.use('/api', indexRouter);
app.use(error404);
app.use(errorHandling);

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});