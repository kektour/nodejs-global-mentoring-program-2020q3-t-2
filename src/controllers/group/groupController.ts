import { NextFunction, Request, Response } from 'express';
import { Permission } from '../../models/group';
import { GroupService } from '../../services/group';

export class GroupController {
  constructor(private groupService: GroupService) {}

  public async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const foundGroups = await this.groupService.getAll();
      res.json({
        data: foundGroups.groups,
        meta: { count: foundGroups.count },
      });
    } catch (err) {
      next(err);
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const foundGroup = await this.groupService.getById(id);
      res.json({
        data: foundGroup ?? {},
        meta: {},
      });
    } catch (err) {
      next(err);
    }
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, permissions } = <{ name: string; permissions: Array<Permission> }>req.body;
      const newGroup = await this.groupService.create(name, permissions);
      res.json({
        data: newGroup,
        meta: {},
      });
    } catch (err) {
      next(err);
    }
  }

  public async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const updatedGroup = await this.groupService.update(id, req.body);
      res.json({
        data: updatedGroup ?? {},
        meta: {},
      });
    } catch (err) {
      next(err);
    }
  }

  public async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const removedGroup = await this.groupService.remove(id);
      res.json({
        data: removedGroup ?? {},
        meta: {},
      });
    } catch (err) {
      next(err);
    }
  }
}
