import { UserDAL } from '../../dataAccess/user';
import { UserAttributes } from '../../models/user';
import { UserService } from './user';

export class UserServiceImpl implements UserService {
  constructor(private userDAL: UserDAL) {}

  public getAll(
    attrs: Partial<UserAttributes>,
    page?: number,
    limit?: number
  ): Promise<{
    users: Array<UserAttributes>;
    count: number;
  }> {
    return this.userDAL.findAll(attrs, page, limit, { skipDeleted: true });
  }

  public getById(id: string): Promise<UserAttributes | null> {
    return this.userDAL.findById(id);
  }

  public create(login: string, password: string, age: number): Promise<UserAttributes> {
    return this.userDAL.create(login, password, age);
  }

  public update(id: string, attrs: Partial<UserAttributes>): Promise<UserAttributes | null> {
    return this.userDAL.update(id, attrs);
  }

  public remove(id: string): Promise<UserAttributes | null> {
    return this.userDAL.remove(id);
  }
}
