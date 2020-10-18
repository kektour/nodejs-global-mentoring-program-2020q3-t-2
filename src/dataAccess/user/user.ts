import { UserAttributes } from '../../models/user';

export interface FindAllOptions {
  skipDeleted?: boolean;
}

export interface UserDAL {
  findAll(
    attrs: Partial<UserAttributes>,
    page?: number,
    limit?: number,
    options?: FindAllOptions
  ): Promise<{ users: Array<UserAttributes>; count: number }>;
  findOne(attrs: Partial<UserAttributes>): Promise<UserAttributes | null>
  findById(id: string): Promise<UserAttributes | null>;
  create(login: string, password: string, age: number): Promise<UserAttributes>;
  update(id: string, attrs: Partial<UserAttributes>): Promise<UserAttributes | null>;
  remove(id: string): Promise<UserAttributes | null>;
}
