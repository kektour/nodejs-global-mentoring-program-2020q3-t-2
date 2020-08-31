import { Sequelize } from 'sequelize';
import { EnvService, EnvServiceImpl } from '../services/env';
import { userFactory } from './user';

const envService: EnvService = new EnvServiceImpl();
export const connection = new Sequelize(envService.getVar('CONNECTION_STRING'));
export const UserModel = userFactory(connection);

async function connect(): Promise<void> {
  try {
    await connection.authenticate();
    console.log('Connection has been established successfully');
  } catch (err) {
    console.error('Unable to connect to the database ', err);
  }
}
connect();
