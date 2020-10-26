import express from 'express';
import cors from 'cors';
import passport from 'passport';
import jwtStrategy from './jwtStrategy';
import authRouter from './controllers/auth/authRouter';
import userRouter from './controllers/user/userRouter';
import groupRouter from './controllers/group/groupRouter';
import endpointLogger from './middlewares/endpointLogger';
import errorMiddleware from './middlewares/error';
import withJwt from './middlewares/withJwt';

const app = express();
app.use(cors());
app.use(express.json());
app.use(passport.initialize());
app.use(endpointLogger);
app.use('/', authRouter);
app.use('/users', withJwt, userRouter);
app.use('/groups', withJwt, groupRouter);
app.use(errorMiddleware);

passport.use(jwtStrategy);

export default app;
