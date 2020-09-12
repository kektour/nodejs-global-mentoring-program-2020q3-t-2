import { GroupAttributes, Permission } from '../../models/group';

export interface GroupService {
  getAll(): Promise<{
    groups: Array<GroupAttributes>;
    count: number;
  }>;
  getById(id: string): Promise<GroupAttributes | null>;
  create(name: string, permissions: Array<Permission>): Promise<GroupAttributes>;
  update(id: string, attrs: Partial<GroupAttributes>): Promise<GroupAttributes | null>;
  remove(id: string): Promise<GroupAttributes | null>;
}
