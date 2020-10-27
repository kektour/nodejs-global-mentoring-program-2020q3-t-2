import { Request, Response } from 'express';
import { AuthService } from '../../services/auth';

export class AuthController {
  constructor(private authService: AuthService) {}
  async login(req: Request, res: Response) {
    const login: string = req.body.login;
    const password: string = req.body.password;

    const loginRes = await this.authService.login(login, password);
    if (!loginRes.success) {
      return res.status(400).json(loginRes.data);
    }

    return res.json(loginRes.data);
  }

  async refreshToken(req: Request, res: Response) {
    const refreshToken: string = req.body.refreshToken;

    const refreshTokenRes = await this.authService.refreshToken(refreshToken);
    if (!refreshTokenRes.success) {
      return res.status(403).json(refreshTokenRes.data);
    }

    return res.json(refreshTokenRes.data);
  }

  async deleteRefreshToken(req: Request, res: Response) {
    const refreshToken: string = req.body.refreshToken;

    const deleteTokenRes = await this.authService.deleteToken(refreshToken);
    if (!deleteTokenRes.success) {
      return res.status(403).json(deleteTokenRes.data);
    }

    return res.json({ success: true });
  }
}
