import express from 'express';
import { UserDALImpl } from '../dataAccess/user';
import deleteSchema from '../middlewares/validation/auth/deleteSchema';
import postSchema from '../middlewares/validation/auth/postSchema';
import putSchema from '../middlewares/validation/auth/putSchema';
import validateSchema from '../middlewares/validation/validateSchema';
import { AuthService, AuthServiceImpl } from '../services/auth';
import { JwtServiceImpl } from '../services/jwt';
import { UtilsServiceImpl } from '../services/utils';

const router = express.Router();

const authService: AuthService = new AuthServiceImpl(new JwtServiceImpl(), new UserDALImpl(new UtilsServiceImpl()), new UtilsServiceImpl());

router.post('/login', validateSchema(postSchema, 'body'), async (req, res) => {
  const login: string = req.body.login;
  const password: string = req.body.password;

  const loginRes = await authService.login(login, password);
  if (!loginRes.success) {
    return res.status(400).json(loginRes.data);
  }

  return res.json(loginRes.data);
});

router.post('/refresh-token', validateSchema(putSchema, 'body'), async (req, res) => {
  const refreshToken: string = req.body.refreshToken;

  const refreshTokenRes = await authService.refreshToken(refreshToken);
  if (!refreshTokenRes.success) {
    return res.status(403).json(refreshTokenRes.data);
  }

  return res.json(refreshTokenRes.data);
});

router.delete('/refresh-token', validateSchema(deleteSchema, 'body'), async (req, res) => {
  const refreshToken: string = req.body.refreshToken;

  const deleteTokenRes = await authService.deleteToken(refreshToken);
  if (!deleteTokenRes.success) {
    return res.status(403).json(deleteTokenRes.data);
  }

  return res.json({ success: true });
});

export default router;
