import express from 'express';
import bodyParser from 'body-parser';
import usersRouter from './usersRouter';

const app = express();
app.use(bodyParser.json());
app.use('/users', usersRouter);

export default app;
