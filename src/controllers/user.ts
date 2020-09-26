import express from 'express';
import { UserDALImpl } from '../dataAccess/user';
import getSchema from '../middlewares/validation/user/getSchema';
import postSchema from '../middlewares/validation/user/postSchema';
import putSchema from '../middlewares/validation/user/putSchema';
import validateSchema from '../middlewares/validation/validateSchema';
import { UserService, UserServiceImpl } from '../services/user';
import { UtilsServiceImpl } from '../services/utils';

const router = express.Router();
const userService: UserService = new UserServiceImpl(new UserDALImpl(new UtilsServiceImpl()));

interface GETQuery {
  login?: string;
  limit?: number;
  page?: number;
}
router.get('/', validateSchema(getSchema, 'query'), async (req, res, next) => {
  try {
    const { login, page, limit } = <GETQuery>req.query;
    const foundUsersByLogin = await userService.getAll({ login }, page, limit);
    res.json({
      data: foundUsersByLogin.users,
      meta: { count: foundUsersByLogin.count },
    });
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const foundUser = await userService.getById(id);
    res.json({
      data: foundUser ?? {},
      meta: {},
    });
  } catch (err) {
    next(err);
  }
});

interface POSTBody {
  login: string;
  password: string;
  age: number;
}
router.post('/', validateSchema(postSchema, 'body'), async (req, res, next) => {
  try {
    const { login, password, age } = <POSTBody>req.body;
    const newUser = await userService.create(login, password, age);
    res.json({
      data: newUser,
      meta: {},
    });
  } catch (err) {
    next(err);
  }
});

router.put('/:id', validateSchema(putSchema, 'body'), async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedUser = await userService.update(id, req.body);
    res.json({
      data: updatedUser ?? {},
      meta: {},
    });
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const removedUser = await userService.remove(id);
    res.json({
      data: removedUser ?? {},
      meta: {},
    });
  } catch (err) {
    next(err);
  }
});

export default router;
