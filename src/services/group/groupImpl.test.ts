import { GroupDAL, GroupDALImpl } from '../../dataAccess/group';
import { GroupAttributes, Permission } from '../../models/group';
import { UserAttributes } from '../../models/user';
import { UtilsService, UtilsServiceImpl } from '../utils';
import { GroupService } from './group';
import { GroupServiceImpl } from './groupImpl';

describe('GroupServiceImpl', () => {
  let utilsService: UtilsService;
  let groupDAL: GroupDAL;
  let groupService: GroupService;

  beforeEach(() => {
    utilsService = new UtilsServiceImpl();
    groupDAL = new GroupDALImpl(utilsService);
    groupService = new GroupServiceImpl(groupDAL);
  });

  it('getAll function should return data from DAL', async () => {
    const returnRes = 'Foo';
    const findAllMock = jest.spyOn(groupDAL, 'findAll').mockImplementationOnce(() => Promise.resolve(returnRes) as any);

    const res = await groupService.getAll();

    expect(findAllMock).toHaveBeenCalled();
    expect(res).toEqual(returnRes);
  });

  it('getById function should return data from DAL', async () => {
    const returnRes = 'Foo';
    const findByIdlMock = jest.spyOn(groupDAL, 'findById').mockImplementationOnce(() => Promise.resolve(returnRes) as any);

    const id = '1';
    const res = await groupService.getById(id);

    expect(findByIdlMock).toHaveBeenCalledWith(id);
    expect(res).toEqual(returnRes);
  });

  it('create function should return data from DAL', async () => {
    const returnRes = 'Foo';
    const createMock = jest.spyOn(groupDAL, 'create').mockImplementationOnce(() => Promise.resolve(returnRes) as any);

    const name = 'name';
    const permissions: Array<Permission> = [Permission.READ];
    const res = await groupService.create(name, permissions);

    expect(createMock).toHaveBeenCalledWith(name, permissions);
    expect(res).toEqual(returnRes);
  });

  it('update function should return data from DAL', async () => {
    const returnRes = 'Foo';
    const findByIdlMock = jest.spyOn(groupDAL, 'update').mockImplementationOnce(() => Promise.resolve(returnRes) as any);

    const id = '1';
    const attrs: Partial<GroupAttributes> = {
      name: 'login',
      permissions: [Permission.READ],
    };
    const res = await groupService.update(id, attrs);

    expect(findByIdlMock).toHaveBeenCalledWith(id, attrs);
    expect(res).toEqual(returnRes);
  });

  it('remove function should return data from DAL', async () => {
    const returnRes = 'Foo';
    const removeMock = jest.spyOn(groupDAL, 'remove').mockImplementationOnce(() => Promise.resolve(returnRes) as any);

    const id = '1';
    const res = await groupService.remove(id);

    expect(removeMock).toHaveBeenCalledWith(id);
    expect(res).toEqual(returnRes);
  });
});
