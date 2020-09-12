import express from 'express';
import { GroupDALImpl } from '../dataAccess/group';
import postSchema from '../middlewares/validation/group/postSchema';
import putSchema from '../middlewares/validation/group/putSchema';
import validateSchema from '../middlewares/validation/validateSchema';
import { Permission } from '../models/group';
import { GroupService, GroupServiceImpl } from '../services/group';
import { UtilsServiceImpl } from '../services/utils';

const router = express.Router();
const groupService: GroupService = new GroupServiceImpl(new GroupDALImpl(new UtilsServiceImpl()));

router.get('/', async (req, res) => {
  const foundGroups = await groupService.getAll();
  res.json({
    data: foundGroups.groups,
    meta: { count: foundGroups.count },
  });
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const foundGroup = await groupService.getById(id);
  res.json({
    data: foundGroup ?? {},
    meta: {},
  });
});

interface POSTBody {
  name: string;
  permissions: Array<Permission>;
}
router.post('/', validateSchema(postSchema, 'body'), async (req, res) => {
  const { name, permissions } = <POSTBody>req.body;
  const newGroup = await groupService.create(name, permissions);
  res.json({
    data: newGroup,
    meta: {},
  });
});

router.put('/:id', validateSchema(putSchema, 'body'), async (req, res) => {
  const { id } = req.params;
  const updatedGroup = await groupService.update(id, req.body);
  res.json({
    data: updatedGroup ?? {},
    meta: {},
  });
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const removedGroup = await groupService.remove(id);
  res.json({
    data: removedGroup ?? {},
    meta: {},
  });
});

export default router;
