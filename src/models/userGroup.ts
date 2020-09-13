import { DataTypes, Model, ModelCtor, Sequelize } from 'sequelize';

export type UserGroupAttributes = {
  id: string;
  user_id: string;
  group_id: string;
};
export interface UserGroupCreationAttributes extends UserGroupAttributes {}
export interface UserGroupInstance extends Model<UserGroupAttributes, UserGroupCreationAttributes>, UserGroupAttributes {}

export function userGroupFactory(sequelize: Sequelize): ModelCtor<UserGroupInstance> {
  return sequelize.define<UserGroupInstance>(
    'users_groups',
    {
      id: {
        type: DataTypes.TEXT,
        primaryKey: true,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      group_id: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
}
