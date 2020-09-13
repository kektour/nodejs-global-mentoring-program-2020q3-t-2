import { Sequelize } from 'sequelize';
import { UtilsService, UtilsServiceImpl } from '../services/utils';
import { groupFactory } from './group';
import { userFactory } from './user';
import { userGroupFactory } from './userGroup';

const utilsService: UtilsService = new UtilsServiceImpl();
export const connection = new Sequelize(utilsService.getEnvVar('CONNECTION_STRING'));
export const UserModel = userFactory(connection);
export const GroupModel = groupFactory(connection);
export const UserGroupModel = userGroupFactory(connection);

UserModel.belongsToMany(GroupModel, { foreignKey: 'user_id', sourceKey: 'id', through: UserGroupModel });
GroupModel.belongsToMany(UserModel, { foreignKey: 'group_id', sourceKey: 'id', through: UserGroupModel });

async function connect(): Promise<void> {
  try {
    await connection.authenticate();
    console.log('Connection has been established successfully');
  } catch (err) {
    console.error('Unable to connect to the database ', err);
  }
}
connect();
