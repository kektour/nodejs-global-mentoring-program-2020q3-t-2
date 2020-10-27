import express from 'express';
import { UserDAL, UserDALImpl } from '../../dataAccess/user';
import getSchema from '../../middlewares/validation/user/getSchema';
import postSchema from '../../middlewares/validation/user/postSchema';
import putSchema from '../../middlewares/validation/user/putSchema';
import validateSchema from '../../middlewares/validation/validateSchema';
import { UserService, UserServiceImpl } from '../../services/user';
import { UtilsService, UtilsServiceImpl } from '../../services/utils';
import { UserController } from './userController';

const utilsService: UtilsService = new UtilsServiceImpl();
const userDAL: UserDAL = new UserDALImpl(utilsService);
const userService: UserService = new UserServiceImpl(userDAL);
const userController = new UserController(userService);

const router = express.Router();

router.get('/', validateSchema(getSchema, 'query'), userController.getAll);
router.get('/:id', userController.getById);
router.post('/', validateSchema(postSchema, 'body'), userController.create);
router.put('/:id', validateSchema(putSchema, 'body'), userController.update);
router.delete('/:id', userController.remove);

export default router;
