import express from 'express';
import { GroupDAL, GroupDALImpl } from '../../dataAccess/group';
import postSchema from '../../middlewares/validation/group/postSchema';
import putSchema from '../../middlewares/validation/group/putSchema';
import validateSchema from '../../middlewares/validation/validateSchema';
import { GroupService, GroupServiceImpl } from '../../services/group';
import { UtilsService, UtilsServiceImpl } from '../../services/utils';
import { GroupController } from './groupController';

const utilsService: UtilsService = new UtilsServiceImpl();
const groupDAL: GroupDAL = new GroupDALImpl(utilsService);
const groupService: GroupService = new GroupServiceImpl(groupDAL);
const groupController = new GroupController(groupService);

const router = express.Router();

router.get('/', groupController.getAll);
router.get('/:id', groupController.getById);
router.post('/', validateSchema(postSchema, 'body'), groupController.create);
router.put('/:id', validateSchema(putSchema, 'body'), groupController.update);
router.delete('/:id', groupController.remove);

export default router;
