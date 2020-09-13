import { GroupAttributes, Permission } from '../../models/group';
import { UserAttributes } from '../../models/user';

export interface GroupWithUsers extends GroupAttributes {
  users: Array<UserAttributes>;
}

export interface GroupDAL {
  findAll(): Promise<{ groups: Array<GroupAttributes>; count: number }>;
  findById(id: string): Promise<GroupAttributes | null>;
  create(name: string, permissions: Array<Permission>): Promise<GroupAttributes>;
  update(id: string, attrs: Partial<GroupAttributes>): Promise<GroupAttributes | null>;
  remove(id: string): Promise<GroupAttributes | null>;
  addUsersToGroup(id: string, userIds: Array<string>): Promise<GroupWithUsers | null>;
}
