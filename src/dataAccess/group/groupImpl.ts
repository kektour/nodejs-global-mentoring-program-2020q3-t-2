import { connection, GroupModel, UserGroupModel, UserModel } from '../../models';
import { GroupAttributes, Permission } from '../../models/group';
import { UtilsService } from '../../services/utils';
import { GroupDAL, GroupWithUsers } from './group';

export class GroupDALImpl implements GroupDAL {
  constructor(private utilsService: UtilsService) {}

  public async findAll(): Promise<{ groups: Array<GroupAttributes>; count: number }> {
    const groups = await GroupModel.findAndCountAll({ raw: true });
    return {
      groups: <Array<GroupAttributes>>groups.rows,
      count: groups.count,
    };
  }

  public async findById(id: string): Promise<GroupAttributes | null> {
    const group = await GroupModel.findByPk(id, { raw: true });
    return <GroupAttributes | null>group;
  }

  public async create(name: string, permissions: Array<Permission>): Promise<GroupAttributes> {
    const group: GroupAttributes = {
      id: this.utilsService.getUUID(),
      name,
      permissions,
    };
    const savedGroup = await GroupModel.create(group, { raw: true });
    return <GroupAttributes>savedGroup;
  }

  public async update(id: string, attrs: Partial<GroupAttributes>): Promise<GroupAttributes | null> {
    let group = await GroupModel.findByPk(id);
    if (!group) {
      return null;
    }
    group = await group.update(attrs);
    return <GroupAttributes>group.get({ plain: true });
  }

  public async remove(id: string): Promise<GroupAttributes | null> {
    const group = await GroupModel.findByPk(id, { raw: true });
    if (!group) {
      return null;
    }
    await Promise.all([GroupModel.destroy({ where: { id } }), UserGroupModel.destroy({ where: { group_id: id } })]);
    return <GroupAttributes>group;
  }

  public async addUsersToGroup(id: string, userIds: Array<string>): Promise<GroupWithUsers | null> {
    const t = await connection.transaction();
    const group = await GroupModel.findByPk(id, { transaction: t });
    if (!group) {
      await t.rollback();
      return null;
    }
    await UserGroupModel.bulkCreate(
      userIds.map((uId) => ({ id: this.utilsService.getUUID(), group_id: id, user_id: uId })),
      { transaction: t }
    );
    const groupWithUsers = await GroupModel.findByPk(id, {
      include: [{ model: UserModel, through: { attributes: [] } }],
      nest: true,
      transaction: t,
    });
    await t.commit();
    return <GroupWithUsers>groupWithUsers!.get({ plain: true });
  }
}
