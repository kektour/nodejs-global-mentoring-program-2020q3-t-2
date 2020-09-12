import express from 'express';
import userRouter from './controllers/user';
import groupController from './controllers/group';
import './models';

const app = express();
app.use(express.json());
app.use('/users', userRouter);
app.use('/groups', groupController);

export default app;
