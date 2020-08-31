import express from 'express';
import usersRouter from './controllers/users';
import './models';

const app = express();
app.use(express.json());
app.use('/users', usersRouter);

export default app;
