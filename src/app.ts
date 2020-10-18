import express from 'express';
import cors from 'cors';
import passport from 'passport';
import jwtStrategy from './jwtStrategy';
import authRouter from './controllers/auth';
import userRouter from './controllers/user';
import groupController from './controllers/group';
import endpointLogger from './middlewares/endpointLogger';
import errorMiddleware from './middlewares/error';
import withJwt from './middlewares/withJwt';
import './models';

const app = express();
app.use(cors());
app.use(express.json());
app.use(passport.initialize());
app.use(endpointLogger);
app.use('/', authRouter);
app.use('/users', withJwt, userRouter);
app.use('/groups', withJwt, groupController);
app.use(errorMiddleware);

passport.use(jwtStrategy);

export default app;
