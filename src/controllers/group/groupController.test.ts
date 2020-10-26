import { GroupService } from '../../services/group';
import { GroupController } from './groupController';

describe('groupController', () => {
  let groupSeriveStub: GroupService;
  let groupController: GroupController;

  beforeEach(() => {
    groupSeriveStub = {
      getAll: jest.fn(),
      getById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };
    groupController = new GroupController(groupSeriveStub);
  });

  it('getAll should call service', async () => {
    const res = { json: jest.fn() } as any;
    jest.spyOn(groupSeriveStub, 'getAll').mockImplementationOnce(() => Promise.resolve({ groups: [1, 2, 3], count: 3 } as any));

    await groupController.getAll({} as any, res, jest.fn());
    expect(groupSeriveStub.getAll).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith({ data: [1, 2, 3], meta: { count: 3 } });
  });

  it('getAll should call next if service throw error', async () => {
    const next = jest.fn();
    const err = new Error('getAll Error');
    jest.spyOn(groupSeriveStub, 'getAll').mockImplementationOnce(() => {
      throw err;
    });

    await groupController.getAll({ query: {} } as any, {} as any, next);
    expect(next).toHaveBeenCalledWith(err);
  });

  it('getById should call service', async () => {
    const id = '123';
    const group = { id, name: 'name' };
    const req = { params: { id } } as any;
    const res = { json: jest.fn() } as any;
    jest.spyOn(groupSeriveStub, 'getById').mockImplementationOnce(() => Promise.resolve(group as any));

    await groupController.getById(req, res, jest.fn());
    expect(groupSeriveStub.getById).toHaveBeenCalledWith(id);
    expect(res.json).toHaveBeenCalledWith({ data: group, meta: {} });
  });

  it('getById should call service and return empty result if service returns null', async () => {
    const id = '123';
    const req = { params: { id } } as any;
    const res = { json: jest.fn() } as any;
    jest.spyOn(groupSeriveStub, 'getById').mockImplementationOnce(() => Promise.resolve(null));

    await groupController.getById(req, res, jest.fn());
    expect(res.json).toHaveBeenCalledWith({ data: {}, meta: {} });
  });

  it('getById should call next if service throw error', async () => {
    const next = jest.fn();
    const err = new Error('getById Error');
    jest.spyOn(groupSeriveStub, 'getById').mockImplementationOnce(() => {
      throw err;
    });

    await groupController.getById({ params: {} } as any, {} as any, next);
    expect(next).toHaveBeenCalledWith(err);
  });

  it('create should call service', async () => {
    const group = {
      name: 'name',
      permissions: ['permissions'],
    };
    const createdGroup = {
      ...group,
      id: '123',
    };
    const req = { body: { ...group } } as any;
    const res = { json: jest.fn() } as any;
    jest.spyOn(groupSeriveStub, 'create').mockImplementationOnce(() => Promise.resolve(createdGroup as any));

    await groupController.create(req, res, jest.fn());
    expect(groupSeriveStub.create).toHaveBeenCalledWith(group.name, group.permissions);
    expect(res.json).toHaveBeenCalledWith({
      data: createdGroup,
      meta: {},
    });
  });

  it('create should call next if service throw error', async () => {
    const next = jest.fn();
    const err = new Error('create Error');
    jest.spyOn(groupSeriveStub, 'create').mockImplementationOnce(() => {
      throw err;
    });

    await groupController.create({ body: {} } as any, {} as any, next);
    expect(next).toHaveBeenCalledWith(err);
  });

  it('update should call service', async () => {
    const id = '123';
    const toUpdate = { name: 'name' };
    const req = { params: { id }, body: toUpdate } as any;
    const res = { json: jest.fn() } as any;
    jest.spyOn(groupSeriveStub, 'update').mockImplementationOnce(() => Promise.resolve({ id, ...toUpdate } as any));

    await groupController.update(req, res, jest.fn());
    expect(groupSeriveStub.update).toHaveBeenCalledWith(id, toUpdate);
    expect(res.json).toHaveBeenCalledWith({ data: { id, ...toUpdate }, meta: {} });
  });

  it('update should call service and return empty result if service returns null', async () => {
    const id = '123';
    const toUpdate = { name: 'name' };
    const req = { params: { id }, body: toUpdate } as any;
    const res = { json: jest.fn() } as any;
    jest.spyOn(groupSeriveStub, 'update').mockImplementationOnce(() => Promise.resolve(null));

    await groupController.update(req, res, jest.fn());
    expect(res.json).toHaveBeenCalledWith({ data: {}, meta: {} });
  });

  it('update should call next if service throw error', async () => {
    const next = jest.fn();
    const err = new Error('create Error');
    jest.spyOn(groupSeriveStub, 'update').mockImplementationOnce(() => {
      throw err;
    });

    await groupController.update({ params: {}, body: {} } as any, {} as any, next);
    expect(next).toHaveBeenCalledWith(err);
  });

  it('remove should call service', async () => {
    const id = '123';
    const user = { id, login: 'login' };
    const req = { params: { id } } as any;
    const res = { json: jest.fn() } as any;
    jest.spyOn(groupSeriveStub, 'remove').mockImplementationOnce(() => Promise.resolve(user as any));

    await groupController.remove(req, res, jest.fn());
    expect(groupSeriveStub.remove).toHaveBeenCalledWith(id);
    expect(res.json).toHaveBeenCalledWith({ data: user, meta: {} });
  });

  it('remove should call service and return empty result if service returns null', async () => {
    const id = '123';
    const req = { params: { id } } as any;
    const res = { json: jest.fn() } as any;
    jest.spyOn(groupSeriveStub, 'remove').mockImplementationOnce(() => Promise.resolve(null as any));

    await groupController.remove(req, res, jest.fn());
    expect(res.json).toHaveBeenCalledWith({ data: {}, meta: {} });
  });

  it('remove should call next if service throw error', async () => {
    const next = jest.fn();
    const err = new Error('remove Error');
    jest.spyOn(groupSeriveStub, 'remove').mockImplementationOnce(() => {
      throw err;
    });

    await groupController.remove({ params: {} } as any, {} as any, next);
    expect(next).toHaveBeenCalledWith(err);
  });
});
