import { UserDAL, UserDALImpl } from '../../dataAccess/user';
import { UserAttributes } from '../../models/user';
import { UtilsService, UtilsServiceImpl } from '../utils';
import { UserService } from './user';
import { UserServiceImpl } from './userImpl';

describe('UserServiceImpl', () => {
  let utilsService: UtilsService;
  let userDAL: UserDAL;
  let userService: UserService;

  beforeEach(() => {
    utilsService = new UtilsServiceImpl();
    userDAL = new UserDALImpl(utilsService);
    userService = new UserServiceImpl(userDAL);
  });

  it('getAll function should return data from DAL', async () => {
    const returnRes = 'Foo';
    const findAllMock = jest.spyOn(userDAL, 'findAll').mockImplementationOnce(() => Promise.resolve(returnRes) as any);

    const attrs: Partial<UserAttributes> = {
      id: 'id',
      login: 'login',
    };
    const page = 2;
    const limit = 4;
    const res = await userService.getAll(attrs, page, limit);

    expect(findAllMock).toHaveBeenCalledWith(attrs, page, limit, { skipDeleted: true });
    expect(res).toEqual(returnRes);
  });

  it('getById function should return data from DAL', async () => {
    const returnRes = 'Foo';
    const findByIdlMock = jest.spyOn(userDAL, 'findById').mockImplementationOnce(() => Promise.resolve(returnRes) as any);

    const id = '1';
    const res = await userService.getById(id);

    expect(findByIdlMock).toHaveBeenCalledWith(id);
    expect(res).toEqual(returnRes);
  });

  it('create function should return data from DAL', async () => {
    const returnRes = 'Foo';
    const createMock = jest.spyOn(userDAL, 'create').mockImplementationOnce(() => Promise.resolve(returnRes) as any);

    const login = 'login';
    const password = 'password';
    const age = 20;
    const res = await userService.create(login, password, age);

    expect(createMock).toHaveBeenCalledWith(login, password, age);
    expect(res).toEqual(returnRes);
  });

  it('update function should return data from DAL', async () => {
    const returnRes = 'Foo';
    const findByIdlMock = jest.spyOn(userDAL, 'update').mockImplementationOnce(() => Promise.resolve(returnRes) as any);

    const id = '1';
    const attrs: Partial<UserAttributes> = {
      login: 'login',
      password: 'password',
    };
    const res = await userService.update(id, attrs);

    expect(findByIdlMock).toHaveBeenCalledWith(id, attrs);
    expect(res).toEqual(returnRes);
  });

  it('remove function should return data from DAL', async () => {
    const returnRes = 'Foo';
    const removeMock = jest.spyOn(userDAL, 'remove').mockImplementationOnce(() => Promise.resolve(returnRes) as any);

    const id = '1';
    const res = await userService.remove(id);

    expect(removeMock).toHaveBeenCalledWith(id);
    expect(res).toEqual(returnRes);
  });
});
