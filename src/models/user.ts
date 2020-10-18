import { DataTypes, Model, ModelCtor, Sequelize } from 'sequelize';

export interface UserAttributes {
  id: string;
  login: string;
  password: string;
  age: number;
  is_deleted: boolean;
  refresh_token: string | null;
}
export interface UserCreationAttributes extends UserAttributes {}
export interface UserInstance extends Model<UserAttributes, UserCreationAttributes>, UserAttributes {}

export function userFactory(sequelize: Sequelize): ModelCtor<UserInstance> {
  return sequelize.define<UserInstance>(
    'users',
    {
      id: {
        type: DataTypes.TEXT,
        primaryKey: true,
        allowNull: false,
      },
      login: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      is_deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      refresh_token: {
        type: DataTypes.TEXT,
      }
    },
    { timestamps: false }
  );
}
