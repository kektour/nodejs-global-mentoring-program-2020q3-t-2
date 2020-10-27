import express from 'express';
import { UserDAL, UserDALImpl } from '../../dataAccess/user';
import deleteSchema from '../../middlewares/validation/auth/deleteSchema';
import postSchema from '../../middlewares/validation/auth/postSchema';
import putSchema from '../../middlewares/validation/auth/putSchema';
import validateSchema from '../../middlewares/validation/validateSchema';
import { AuthService, AuthServiceImpl } from '../../services/auth';
import { JwtService, JwtServiceImpl } from '../../services/jwt';
import { UtilsService, UtilsServiceImpl } from '../../services/utils';
import { AuthController } from './authController';

const utilsService: UtilsService = new UtilsServiceImpl();
const userDAL: UserDAL = new UserDALImpl(utilsService);
const jwtService: JwtService = new JwtServiceImpl();
const authService: AuthService = new AuthServiceImpl(jwtService, userDAL, utilsService);
const authController = new AuthController(authService);

const router = express.Router();

router.post('/login', validateSchema(postSchema, 'body'), authController.login);
router.post('/refresh-token', validateSchema(putSchema, 'body'), authController.refreshToken);
router.delete('/refresh-token', validateSchema(deleteSchema, 'body'), authController.deleteRefreshToken);

export default router;
