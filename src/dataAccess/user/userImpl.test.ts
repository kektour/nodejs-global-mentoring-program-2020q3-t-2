import { Op } from 'sequelize';
import { UserGroupModel, UserModel } from '../../models';
import { UserAttributes } from '../../models/user';
import { UtilsService, UtilsServiceImpl } from '../../services/utils';
import { UserDAL } from './user';
import { UserDALImpl } from './userImpl';

describe('UserDALImpl', () => {
  let utilsService: UtilsService;
  let userDAL: UserDAL;

  beforeEach(() => {
    utilsService = new UtilsServiceImpl();
    userDAL = new UserDALImpl(utilsService);
  });

  it('findAll function should call model function', async () => {
    const findAndCountAllMockRes = [1, 2, 3];
    const findAndCountAllMock = jest
      .spyOn(UserModel, 'findAndCountAll')
      .mockImplementationOnce(() => Promise.resolve({ rows: findAndCountAllMockRes, count: findAndCountAllMockRes.length } as any));

    const res = await userDAL.findAll({ id: '1', password: 'foo', age: 20 });

    expect(findAndCountAllMock).toHaveBeenCalledWith({
      where: {},
      offset: undefined,
      limit: undefined,
      order: [['login', 'ASC']],
      raw: true,
    });
    expect(res).toEqual({ users: findAndCountAllMockRes, count: findAndCountAllMockRes.length });
  });

  it('findAll function should handle "login" attribute', async () => {
    const findAndCountAllMockRes = [1, 2, 3];
    const findAndCountAllMock = jest
      .spyOn(UserModel, 'findAndCountAll')
      .mockImplementationOnce(() => Promise.resolve({ rows: findAndCountAllMockRes, count: findAndCountAllMockRes.length } as any));

    const res = await userDAL.findAll({ id: '1', login: 'foo' });

    expect(findAndCountAllMock).toHaveBeenCalledWith({
      where: { login: { [Op.iLike]: '%foo%' } },
      offset: undefined,
      limit: undefined,
      order: [['login', 'ASC']],
      raw: true,
    });
    expect(res).toEqual({ users: findAndCountAllMockRes, count: findAndCountAllMockRes.length });
  });

  it('findAll function should handle "skipDeleted" options', async () => {
    const findAndCountAllMockRes = [1, 2, 3];
    const findAndCountAllMock = jest
      .spyOn(UserModel, 'findAndCountAll')
      .mockImplementationOnce(() => Promise.resolve({ rows: findAndCountAllMockRes, count: findAndCountAllMockRes.length } as any));

    const res = await userDAL.findAll({ id: '1' }, undefined, undefined, { skipDeleted: true });

    expect(findAndCountAllMock).toHaveBeenCalledWith({
      where: { is_deleted: { [Op.eq]: false } },
      offset: undefined,
      limit: undefined,
      order: [['login', 'ASC']],
      raw: true,
    });
    expect(res).toEqual({ users: findAndCountAllMockRes, count: findAndCountAllMockRes.length });
  });

  it('findAll function should handle pagination', async () => {
    const findAndCountAllMockRes = [1, 2, 3];
    const findAndCountAllMock = jest
      .spyOn(UserModel, 'findAndCountAll')
      .mockImplementationOnce(() => Promise.resolve({ rows: findAndCountAllMockRes, count: findAndCountAllMockRes.length } as any));

    const res = await userDAL.findAll({ id: '1' }, 2, 4);

    expect(findAndCountAllMock).toHaveBeenCalledWith({
      where: {},
      offset: 8,
      limit: 4,
      order: [['login', 'ASC']],
      raw: true,
    });
    expect(res).toEqual({ users: findAndCountAllMockRes, count: findAndCountAllMockRes.length });
  });

  it('findOne function should call model function', async () => {
    const findOneResMock = { id: '1' };
    const findOneMock = jest.spyOn(UserModel, 'findOne').mockImplementationOnce(() => Promise.resolve(findOneResMock as any));

    const attr = { id: '1', password: 'foo', age: 20 };
    const res = await userDAL.findOne(attr);

    expect(findOneMock).toHaveBeenCalledWith({
      where: attr,
      raw: true,
    });
    expect(res).toEqual(findOneResMock);
  });

  it('findOne function should return null if user not found', async () => {
    const findOneMock = jest.spyOn(UserModel, 'findOne').mockImplementationOnce(() => Promise.resolve(null));

    const attr = { id: '1', password: 'foo', age: 20 };
    const res = await userDAL.findOne(attr);

    expect(findOneMock).toHaveBeenCalledWith({
      where: attr,
      raw: true,
    });
    expect(res).toEqual(null);
  });

  it('findById function should call model function', async () => {
    const findByPkResMock = { id: '1' };
    const findByPkMock = jest.spyOn(UserModel, 'findByPk').mockImplementationOnce(() => Promise.resolve(findByPkResMock as any));

    const id = '1';
    const res = await userDAL.findById(id);

    expect(findByPkMock).toHaveBeenCalledWith(id, { raw: true });
    expect(res).toEqual(findByPkResMock);
  });

  it('findById function should return null if user not found', async () => {
    const findByPkMock = jest.spyOn(UserModel, 'findByPk').mockImplementationOnce(() => Promise.resolve(null));

    const id = '1';
    const res = await userDAL.findById(id);

    expect(findByPkMock).toHaveBeenCalledWith(id, { raw: true });
    expect(res).toEqual(null);
  });

  it('create function should call model function', async () => {
    const id = '123';
    const login = 'login';
    const password = 'password';
    const age = 22;

    const getUUIDMock = jest.spyOn(utilsService, 'getUUID').mockImplementationOnce(() => id);
    const createResMock = {
      id,
      login,
      password,
      age,
      is_deleted: false,
      refresh_token: null,
    };
    const createMock = jest.spyOn(UserModel, 'create').mockImplementationOnce(() => Promise.resolve(createResMock as any));

    const res = await userDAL.create(login, password, age);

    expect(getUUIDMock).toHaveBeenCalled();
    expect(createMock).toHaveBeenCalledWith(createResMock, { raw: true });
    expect(res).toEqual(createResMock);
  });

  it('update function should call model function', async () => {
    const id = '123';
    const attrs: Partial<UserAttributes> = {
      login: 'login',
      is_deleted: true,
    };
    const returnRes = { id: 'foo', login: 'bar' };

    const getMock = jest.fn().mockImplementationOnce(() => returnRes);
    const updateMock = jest.fn().mockImplementationOnce(() => Promise.resolve({ get: getMock }));
    const findByPkMock = jest.spyOn(UserModel, 'findByPk').mockImplementationOnce(() =>
      Promise.resolve({
        update: updateMock,
      } as any)
    );

    const res = await userDAL.update(id, attrs);

    expect(findByPkMock).toHaveBeenCalledWith(id);
    expect(updateMock).toHaveBeenCalledWith(attrs);
    expect(getMock).toHaveBeenCalledWith({ plain: true });
    expect(res).toEqual(returnRes);
  });

  it('update function should return null if user not found', async () => {
    const id = '123';
    const findByPkMock = jest.spyOn(UserModel, 'findByPk').mockImplementationOnce(() => Promise.resolve(null));

    const res = await userDAL.update(id, { login: 'login', is_deleted: true });

    expect(findByPkMock).toHaveBeenCalledWith(id);
    expect(res).toEqual(null);
  });

  it('remove function should call model function', async () => {
    const id = '123';
    const returnRes = { id: 'foo', login: 'bar' };

    const getMock = jest.fn().mockImplementationOnce(() => returnRes);
    const updateMock = jest.fn().mockImplementationOnce(() => Promise.resolve({ get: getMock }));
    const findByPkMock = jest.spyOn(UserModel, 'findByPk').mockImplementationOnce(() =>
      Promise.resolve({
        update: updateMock,
      } as any)
    );
    const destroyMock = jest.spyOn(UserGroupModel, 'destroy').mockImplementationOnce(() => Promise.resolve() as any);

    const res = await userDAL.remove(id);

    expect(findByPkMock).toHaveBeenCalledWith(id);
    expect(updateMock).toHaveBeenCalledWith({ is_deleted: true });
    expect(destroyMock).toHaveBeenCalledWith({ where: { user_id: id } });

    expect(getMock).toHaveBeenCalledWith({ plain: true });
    expect(res).toEqual(returnRes);
  });

  it('remove function should return null if user not found', async () => {
    const id = '123';
    const findByPkMock = jest.spyOn(UserModel, 'findByPk').mockImplementationOnce(() => Promise.resolve(null));

    const res = await userDAL.remove(id);

    expect(findByPkMock).toHaveBeenCalledWith(id);
    expect(res).toEqual(null);
  });
});
