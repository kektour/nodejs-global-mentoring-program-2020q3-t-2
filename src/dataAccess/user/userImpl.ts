import { Op } from 'sequelize';
import { UserModel } from '../../models';
import { UserAttributes, UserCreationAttributes } from '../../models/user';
import { FindAllOptions, UserDAL } from './user';

export class UserDALImpl implements UserDAL {
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

  public async findById(id: string): Promise<UserAttributes | null> {
    const user = await UserModel.findByPk(id, { raw: true });
    return <UserAttributes | null>user;
  }

  public async create(login: string, password: string, age: number): Promise<UserAttributes> {
    const user: UserCreationAttributes = {
      id: Math.random().toString(16).slice(2),
      login,
      password,
      age,
      is_deleted: false,
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
    let user = await UserModel.findByPk(id);
    if (!user) {
      return null;
    }
    user = await user.update({ is_deleted: true });
    return <UserAttributes>user.get({ plain: true });
  }
}
