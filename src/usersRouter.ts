import express from 'express';
import usersStore from './usersStore';
import { validateNewUser, validateUpdateUser, validateGetUser } from './usersValidators';

const router = express.Router();

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const foundUser = usersStore.getById(id);
  res.json({
    data: foundUser ?? {},
  });
});

router.post('/', validateNewUser, (req, res) => {
  const { login, password, age } = req.body;
  const newUser = usersStore.addNew(login, password, age);
  res.json({
    data: newUser,
  });
});

router.put('/:id', validateUpdateUser, (req, res) => {
  const { id } = req.params;
  const updatedUser = usersStore.update(id, req.body);
  res.json({
    data: updatedUser ?? {},
  });
});

router.get('/', validateGetUser, (req, res) => {
  const { login, limit } = req.query;
  const foundUsersByLogin = usersStore.getByLogin(<string>login, parseInt(<string>limit));
  res.json({
    data: foundUsersByLogin,
    meta: { count: foundUsersByLogin.length },
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const removedUser = usersStore.remove(id);
  res.json({
    data: removedUser ?? {},
  });
});

export default router;
