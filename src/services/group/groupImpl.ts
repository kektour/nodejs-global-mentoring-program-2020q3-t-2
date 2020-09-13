import { GroupDAL } from '../../dataAccess/group';
import { GroupAttributes, Permission } from '../../models/group';
import { GroupService } from './group';

export class GroupServiceImpl implements GroupService {
  constructor(private groupDAL: GroupDAL) {}

  public getAll(): Promise<{
    groups: Array<GroupAttributes>;
    count: number;
  }> {
    return this.groupDAL.findAll();
  }

  public getById(id: string): Promise<GroupAttributes | null> {
    return this.groupDAL.findById(id);
  }

  public create(name: string, permissions: Array<Permission>): Promise<GroupAttributes> {
    return this.groupDAL.create(name, permissions);
  }

  public update(id: string, attrs: Partial<GroupAttributes>): Promise<GroupAttributes | null> {
    return this.groupDAL.update(id, attrs);
  }

  public remove(id: string): Promise<GroupAttributes | null> {
    return this.groupDAL.remove(id);
  }
}
