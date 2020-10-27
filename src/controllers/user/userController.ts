import { NextFunction, Request, Response } from 'express';
import { UserService } from '../../services/user';

export class UserController {
  constructor(private userService: UserService) {}

  public async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { login, page, limit } = <{ login?: string; limit?: number; page?: number }>req.query;
      const foundUsersByLogin = await this.userService.getAll({ login }, page, limit);
      res.json({
        data: foundUsersByLogin.users,
        meta: { count: foundUsersByLogin.count },
      });
    } catch (err) {
      next(err);
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const foundUser = await this.userService.getById(id);
      res.json({
        data: foundUser ?? {},
        meta: {},
      });
    } catch (err) {
      next(err);
    }
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { login, password, age } = <{ login: string; password: string; age: number }>req.body;
      const newUser = await this.userService.create(login, password, age);
      res.json({
        data: newUser,
        meta: {},
      });
    } catch (err) {
      next(err);
    }
  }

  public async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const updatedUser = await this.userService.update(id, req.body);
      res.json({
        data: updatedUser ?? {},
        meta: {},
      });
    } catch (err) {
      next(err);
    }
  }

  public async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const removedUser = await this.userService.remove(id);
      res.json({
        data: removedUser ?? {},
        meta: {},
      });
    } catch (err) {
      next(err);
    }
  }
}
