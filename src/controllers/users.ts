import express from 'express';
import { UserDALImpl } from '../dataAccess/user';
import getSchema from '../middlewares/validation/user/getSchema';
import postSchema from '../middlewares/validation/user/postSchema';
import putSchema from '../middlewares/validation/user/putSchema';
import validateSchema from '../middlewares/validation/validateSchema';
import { UserService, UserServiceImpl } from '../services/user';

const router = express.Router();
const userService: UserService = new UserServiceImpl(new UserDALImpl());

interface GETQuery {
  login?: string;
  limit?: number;
  page?: number;
}
router.get('/', validateSchema(getSchema, 'query'), async (req, res) => {
  const { login, page, limit } = <GETQuery>req.query;
  const foundUsersByLogin = await userService.getAll({ login }, page, limit);
  res.json({
    data: foundUsersByLogin.users,
    meta: { count: foundUsersByLogin.count },
  });
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const foundUser = await userService.getById(id);
  res.json({
    data: foundUser ?? {},
    meta: {},
  });
});

interface POSTBody {
  login: string;
  password: string;
  age: number;
}
router.post('/', validateSchema(postSchema, 'body'), async (req, res) => {
  const { login, password, age } = <POSTBody>req.body;
  const newUser = await userService.create(login, password, age);
  res.json({
    data: newUser,
    meta: {},
  });
});

router.put('/:id', validateSchema(putSchema, 'body'), async (req, res) => {
  const { id } = req.params;
  const updatedUser = await userService.update(id, req.body);
  res.json({
    data: updatedUser ?? {},
    meta: {},
  });
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const removedUser = await userService.remove(id);
  res.json({
    data: removedUser ?? {},
    meta: {},
  });
});

export default router;
