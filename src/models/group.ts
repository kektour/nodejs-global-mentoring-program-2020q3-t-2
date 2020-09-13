import { DataTypes, Model, ModelCtor, Sequelize } from 'sequelize';

export enum Permission {
  READ = 'READ',
  WRITE = 'WRITE',
  DELETE = 'DELETE',
  SHARE = 'SHARE',
  UPLOAD_FILES = 'UPLOAD_FILES'
}
export type GroupAttributes = {
  id: string;
  name: string;
  permissions: Array<Permission>;
};

export interface GroupCreationAttributes extends GroupAttributes {}
export interface GroupInstance extends Model<GroupAttributes, GroupCreationAttributes>, GroupAttributes {}

export function groupFactory(sequelize: Sequelize): ModelCtor<GroupInstance> {
  return sequelize.define<GroupInstance>(
    'groups',
    {
      id: {
        type: DataTypes.TEXT,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      permissions: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        allowNull: false,
      },
    },
    { timestamps: false }
  );
}
