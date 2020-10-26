import { GroupModel, UserGroupModel, connection, UserModel } from '../../models';
import { GroupAttributes, Permission } from '../../models/group';
import { UtilsService, UtilsServiceImpl } from '../../services/utils';
import { GroupDAL } from './group';
import { GroupDALImpl } from './groupImpl';

describe('GroupDALImpl', () => {
  let utilsService: UtilsService;
  let groupDAL: GroupDAL;

  beforeEach(() => {
    utilsService = new UtilsServiceImpl();
    groupDAL = new GroupDALImpl(utilsService);
  });

  it('findAll function should call model function', async () => {
    const findAndCountAllMockRes = [1, 2, 3];
    const findAndCountAllMock = jest
      .spyOn(GroupModel, 'findAndCountAll')
      .mockImplementationOnce(() => Promise.resolve({ rows: findAndCountAllMockRes, count: findAndCountAllMockRes.length } as any));

    const res = await groupDAL.findAll();

    expect(findAndCountAllMock).toHaveBeenCalledWith({ raw: true });
    expect(res).toEqual({ groups: findAndCountAllMockRes, count: findAndCountAllMockRes.length });
  });

  it('findById function should call model function', async () => {
    const findByPkResMock = { id: '1' };
    const findByPkMock = jest.spyOn(GroupModel, 'findByPk').mockImplementationOnce(() => Promise.resolve(findByPkResMock as any));

    const id = '1';
    const res = await groupDAL.findById(id);

    expect(findByPkMock).toHaveBeenCalledWith(id, { raw: true });
    expect(res).toEqual(findByPkResMock);
  });

  it('findById function should return null if user not found', async () => {
    const findByPkMock = jest.spyOn(GroupModel, 'findByPk').mockImplementationOnce(() => Promise.resolve(null as any));

    const id = '1';
    const res = await groupDAL.findById(id);

    expect(findByPkMock).toHaveBeenCalledWith(id, { raw: true });
    expect(res).toEqual(null);
  });

  it('create function should call model function', async () => {
    const id = '123';
    const name = 'login';
    const permissions: Array<Permission> = [Permission.READ, Permission.WRITE];

    const getUUIDMock = jest.spyOn(utilsService, 'getUUID').mockImplementationOnce(() => id);
    const createResMock = {
      id,
      name,
      permissions,
    };
    const createMock = jest.spyOn(GroupModel, 'create').mockImplementationOnce(() => Promise.resolve(createResMock as any));

    const res = await groupDAL.create(name, permissions);

    expect(getUUIDMock).toHaveBeenCalled();
    expect(createMock).toHaveBeenCalledWith(createResMock, { raw: true });
    expect(res).toEqual(createResMock);
  });

  it('update function should call model function', async () => {
    const id = '123';
    const attrs: Partial<GroupAttributes> = {
      name: 'name',
      permissions: [Permission.READ],
    };
    const returnRes = { name: 'foo', permissions: ['foo', 'bar'] };

    const getMock = jest.fn().mockImplementationOnce(() => returnRes);
    const updateMock = jest.fn().mockImplementationOnce(() => Promise.resolve({ get: getMock }));
    const findByPkMock = jest.spyOn(GroupModel, 'findByPk').mockImplementationOnce(() =>
      Promise.resolve({
        update: updateMock,
      } as any)
    );

    const res = await groupDAL.update(id, attrs);

    expect(findByPkMock).toHaveBeenCalledWith(id);
    expect(updateMock).toHaveBeenCalledWith(attrs);
    expect(getMock).toHaveBeenCalledWith({ plain: true });
    expect(res).toEqual(returnRes);
  });

  it('update function should return null if user not found', async () => {
    const id = '123';
    const findByPkMock = jest.spyOn(GroupModel, 'findByPk').mockImplementationOnce(() => Promise.resolve(null));

    const res = await groupDAL.update(id, { name: 'foo', permissions: [Permission.DELETE] });

    expect(findByPkMock).toHaveBeenCalledWith(id);
    expect(res).toEqual(null);
  });

  it('remove function should call model function', async () => {
    const id = '123';
    const returnRes = { name: 'foo', permissions: ['foo', 'bar'] };

    const findByPkMock = jest.spyOn(GroupModel, 'findByPk').mockImplementationOnce(() => Promise.resolve(returnRes as any));
    const groupModelDestroyMock = jest.spyOn(GroupModel, 'destroy').mockImplementationOnce(() => Promise.resolve() as any);
    const destroyMock = jest.spyOn(UserGroupModel, 'destroy').mockImplementationOnce(() => Promise.resolve() as any);

    const res = await groupDAL.remove(id);

    expect(findByPkMock).toHaveBeenCalledWith(id, { raw: true });
    expect(groupModelDestroyMock).toHaveBeenCalledWith({ where: { id } });
    expect(destroyMock).toHaveBeenCalledWith({ where: { group_id: id } });

    expect(res).toEqual(returnRes);
  });

  it('remove function should return null if user not found', async () => {
    const id = '123';
    const findByPkMock = jest.spyOn(GroupModel, 'findByPk').mockImplementationOnce(() => Promise.resolve(null));

    const res = await groupDAL.remove(id);

    expect(findByPkMock).toHaveBeenCalledWith(id);
    expect(res).toEqual(null);
  });

  it('addUsersToGroup function should call model function', async () => {
    const tFunc = { commit: jest.fn() };
    jest.spyOn(connection, 'transaction').mockImplementationOnce(() => Promise.resolve(tFunc) as any);
    const getUUIDMock = jest
      .spyOn(utilsService, 'getUUID')
      .mockImplementationOnce(() => 'g_u_1')
      .mockImplementationOnce(() => 'g_u_2');

    const returnData = 'Some data';
    const bulkCreateMock = jest.spyOn(UserGroupModel, 'bulkCreate').mockImplementationOnce(() => Promise.resolve() as any);
    const findByPkGetMock = jest.fn().mockImplementationOnce(() => Promise.resolve(returnData));
    const findByPkMock = jest
      .spyOn(GroupModel, 'findByPk')
      .mockImplementationOnce(() => Promise.resolve({ id }) as any)
      .mockImplementationOnce(() => Promise.resolve({ get: findByPkGetMock }) as any);

    const id = 'g_1';
    const res = await groupDAL.addUsersToGroup(id, ['u_1', 'u_2']);

    expect(getUUIDMock).toHaveBeenCalledTimes(2);
    expect(bulkCreateMock).toHaveBeenCalledWith(
      [
        { id: 'g_u_1', group_id: id, user_id: 'u_1' },
        { id: 'g_u_2', group_id: id, user_id: 'u_2' },
      ],
      { transaction: tFunc }
    );
    expect(findByPkMock).toHaveBeenCalledWith(id, { transaction: tFunc });
    expect(findByPkMock).toHaveBeenCalledWith(id, {
      include: [{ model: UserModel, through: { attributes: [] } }],
      nest: true,
      transaction: tFunc,
    });
    expect(tFunc.commit).toHaveBeenCalled();
    expect(findByPkGetMock).toHaveBeenCalledWith({ plain: true });
    expect(res).toEqual(returnData);
  });

  it('addUsersToGroup function should return null if user not found', async () => {
    const tFunc = { rollback: jest.fn() };
    jest.spyOn(connection, 'transaction').mockImplementationOnce(() => Promise.resolve(tFunc) as any);
    const findByPkMock = jest.spyOn(GroupModel, 'findByPk').mockImplementationOnce(() => Promise.resolve(null) as any);

    const id = 'g_1';
    const res = await groupDAL.addUsersToGroup(id, ['u_1', 'u_2']);

    expect(tFunc.rollback).toHaveBeenCalled();
    expect(findByPkMock).toHaveBeenCalledWith(id, { transaction: tFunc });
    expect(res).toEqual(null);
  });
});
