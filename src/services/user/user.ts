import { UserAttributes } from '../../models/user';

export interface UserService {
  getAll(
    attrs: Partial<UserAttributes>,
    page?: number,
    limit?: number
  ): Promise<{
    users: Array<UserAttributes>;
    count: number;
  }>;
  getById(id: string): Promise<UserAttributes | null>;
  create(login: string, password: string, age: number): Promise<UserAttributes>;
  update(id: string, attrs: Partial<UserAttributes>): Promise<UserAttributes | null>;
  remove(id: string): Promise<UserAttributes | null>;
}
