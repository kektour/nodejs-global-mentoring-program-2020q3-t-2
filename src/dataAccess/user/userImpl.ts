import { Op } from 'sequelize';
import { UserModel, UserGroupModel } from '../../models';
import { UserAttributes, UserCreationAttributes } from '../../models/user';
import { UtilsService } from '../../services/utils';
import { FindAllOptions, UserDAL } from './user';

export class UserDALImpl implements UserDAL {
  constructor(private utilsService: UtilsService) {}

  public async findAll(
    attrs: Partial<UserAttributes>,
    page?: number,
    limit?: number,
    options?: FindAllOptions
  ): Promise<{
    users: Array<UserAttributes>;
    count: number;
  }> {
    const whereObj: { [key: string]: any } = {};
    if (attrs.login) {
      whereObj.login = { [Op.iLike]: `%${attrs.login}%` };
    }
    if (options?.skipDeleted) {
      whereObj.is_deleted = { [Op.eq]: false };
    }
    const users = await UserModel.findAndCountAll({
      where: whereObj,
      offset: page && limit ? page * limit : undefined,
      limit,
      order: [['login', 'ASC']],
      raw: true,
    });
    return {
      users: <Array<UserAttributes>>users.rows,
      count: users.count,
    };
  }

  public async findOne(attrs: Partial<UserAttributes>): Promise<UserAttributes | null> {
    const user = await UserModel.findOne({
      where: { ...attrs },
      raw: true,
    });
    return <UserAttributes | null>user;
  }

  public async findById(id: string): Promise<UserAttributes | null> {
    const user = await UserModel.findByPk(id, { raw: true });
    return <UserAttributes | null>user;
  }

  public async create(login: string, password: string, age: number): Promise<UserAttributes> {
    const user: UserCreationAttributes = {
      id: this.utilsService.getUUID(),
      login,
      password,
      age,
      is_deleted: false,
      refresh_token: null,
    };
    const savedUser = await UserModel.create(user, { raw: true });
    return <UserAttributes>savedUser;
  }

  public async update(id: string, attrs: Partial<UserAttributes>): Promise<UserAttributes | null> {
    let user = await UserModel.findByPk(id);
    if (!user) {
      return null;
    }
    user = await user.update(attrs);
    return <UserAttributes>user.get({ plain: true });
  }

  public async remove(id: string): Promise<UserAttributes | null> {
    const user = await UserModel.findByPk(id);
    if (!user) {
      return null;
    }
    const [updatedUser] = await Promise.all([user.update({ is_deleted: true }), UserGroupModel.destroy({ where: { user_id: id } })]);
    return <UserAttributes>updatedUser.get({ plain: true });
  }
}
