import { UserService } from '../../services/user';
import { UserController } from './userController';

describe('userController', () => {
  let userSeriveStub: UserService;
  let userController: UserController;

  beforeEach(() => {
    userSeriveStub = {
      getAll: jest.fn(),
      getById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };
    userController = new UserController(userSeriveStub);
  });

  it('getAll should call service', async () => {
    const req = { query: { login: 'login', limit: 2, page: 4 } } as any;
    const res = { json: jest.fn() } as any;
    jest.spyOn(userSeriveStub, 'getAll').mockImplementationOnce(() => Promise.resolve({ users: [1, 2, 3], count: 3 } as any));

    await userController.getAll(req, res, jest.fn());
    expect(userSeriveStub.getAll).toHaveBeenCalledWith({ login: req.query.login }, req.query.page, req.query.limit);
    expect(res.json).toHaveBeenCalledWith({ data: [1, 2, 3], meta: { count: 3 } });
  });

  it('getAll should call next if service throw error', async () => {
    const next = jest.fn();
    const err = new Error('getAll Error');
    jest.spyOn(userSeriveStub, 'getAll').mockImplementationOnce(() => {
      throw err;
    });

    await userController.getAll({ query: {} } as any, {} as any, next);
    expect(next).toHaveBeenCalledWith(err);
  });

  it('getById should call service', async () => {
    const id = '123';
    const user = { id, login: 'login' };
    const req = { params: { id } } as any;
    const res = { json: jest.fn() } as any;
    jest.spyOn(userSeriveStub, 'getById').mockImplementationOnce(() => Promise.resolve(user as any));

    await userController.getById(req, res, jest.fn());
    expect(userSeriveStub.getById).toHaveBeenCalledWith(id);
    expect(res.json).toHaveBeenCalledWith({ data: user, meta: {} });
  });

  it('getById should call service and return empty result if service returns null', async () => {
    const id = '123';
    const req = { params: { id } } as any;
    const res = { json: jest.fn() } as any;
    jest.spyOn(userSeriveStub, 'getById').mockImplementationOnce(() => Promise.resolve(null));

    await userController.getById(req, res, jest.fn());
    expect(res.json).toHaveBeenCalledWith({ data: {}, meta: {} });
  });

  it('getById should call next if service throw error', async () => {
    const next = jest.fn();
    const err = new Error('getById Error');
    jest.spyOn(userSeriveStub, 'getById').mockImplementationOnce(() => {
      throw err;
    });

    await userController.getById({ params: {} } as any, {} as any, next);
    expect(next).toHaveBeenCalledWith(err);
  });

  it('create should call service', async () => {
    const user = {
      login: 'login',
      password: 'password',
      age: 20,
    };
    const createdUser = {
      ...user,
      id: '123',
    };
    const req = { body: { ...user } } as any;
    const res = { json: jest.fn() } as any;
    jest.spyOn(userSeriveStub, 'create').mockImplementationOnce(() => Promise.resolve(createdUser as any));

    await userController.create(req, res, jest.fn());
    expect(userSeriveStub.create).toHaveBeenCalledWith(user.login, user.password, user.age);
    expect(res.json).toHaveBeenCalledWith({
      data: createdUser,
      meta: {},
    });
  });

  it('create should call next if service throw error', async () => {
    const next = jest.fn();
    const err = new Error('create Error');
    jest.spyOn(userSeriveStub, 'create').mockImplementationOnce(() => {
      throw err;
    });

    await userController.create({ body: {} } as any, {} as any, next);
    expect(next).toHaveBeenCalledWith(err);
  });

  it('update should call service', async () => {
    const id = '123';
    const toUpdate = { login: 'login' };
    const req = { params: { id }, body: toUpdate } as any;
    const res = { json: jest.fn() } as any;
    jest.spyOn(userSeriveStub, 'update').mockImplementationOnce(() => Promise.resolve({ id, ...toUpdate } as any));

    await userController.update(req, res, jest.fn());
    expect(userSeriveStub.update).toHaveBeenCalledWith(id, toUpdate);
    expect(res.json).toHaveBeenCalledWith({ data: { id, ...toUpdate }, meta: {} });
  });

  it('update should call service and return empty result if service returns null', async () => {
    const id = '123';
    const toUpdate = { login: 'login' };
    const req = { params: { id }, body: toUpdate } as any;
    const res = { json: jest.fn() } as any;
    jest.spyOn(userSeriveStub, 'update').mockImplementationOnce(() => Promise.resolve(null));

    await userController.update(req, res, jest.fn());
    expect(res.json).toHaveBeenCalledWith({ data: {}, meta: {} });
  });

  it('update should call next if service throw error', async () => {
    const next = jest.fn();
    const err = new Error('create Error');
    jest.spyOn(userSeriveStub, 'update').mockImplementationOnce(() => {
      throw err;
    });

    await userController.update({ params: {}, body: {} } as any, {} as any, next);
    expect(next).toHaveBeenCalledWith(err);
  });

  it('remove should call service', async () => {
    const id = '123';
    const user = { id, login: 'login' };
    const req = { params: { id } } as any;
    const res = { json: jest.fn() } as any;
    jest.spyOn(userSeriveStub, 'remove').mockImplementationOnce(() => Promise.resolve(user as any));

    await userController.remove(req, res, jest.fn());
    expect(userSeriveStub.remove).toHaveBeenCalledWith(id);
    expect(res.json).toHaveBeenCalledWith({ data: user, meta: {} });
  });

  it('remove should call service and return empty result if service returns null', async () => {
    const id = '123';
    const req = { params: { id } } as any;
    const res = { json: jest.fn() } as any;
    jest.spyOn(userSeriveStub, 'remove').mockImplementationOnce(() => Promise.resolve(null as any));

    await userController.remove(req, res, jest.fn());
    expect(res.json).toHaveBeenCalledWith({ data: {}, meta: {} });
  });

  it('remove should call next if service throw error', async () => {
    const next = jest.fn();
    const err = new Error('remove Error');
    jest.spyOn(userSeriveStub, 'remove').mockImplementationOnce(() => {
      throw err;
    });

    await userController.remove({ params: {} } as any, {} as any, next);
    expect(next).toHaveBeenCalledWith(err);
  });
});
