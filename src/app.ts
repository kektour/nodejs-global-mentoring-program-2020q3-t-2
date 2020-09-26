import express from 'express';
import userRouter from './controllers/user';
import groupController from './controllers/group';
import endpointLogger from './middlewares/endpointLogger';
import errorMiddleware from './middlewares/error';
import './models';

const app = express();
app.use(express.json());
app.use(endpointLogger);
app.use('/users', userRouter);
app.use('/groups', groupController);
app.use(errorMiddleware);

export default app;
