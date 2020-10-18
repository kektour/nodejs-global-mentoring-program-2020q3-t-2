import { UserDAL } from '../../dataAccess/user';
import { JwtService } from '../jwt';
import { VerifyAdditions } from '../jwt/jwt';
import { UtilsService } from '../utils';
import { AuthService, Payload } from './auth';

export class AuthServiceImpl implements AuthService {
  constructor(private jwtService: JwtService, private userDAL: UserDAL, private utilsService: UtilsService) {}

  public async login(login: string, password: string): Promise<{ success: boolean; data: { [key: string]: string } }> {
    const user = await this.userDAL.findOne({ login });
    if (!user) {
      return {
        success: false,
        data: { login: 'User is not found' },
      };
    }
    if (user.password === password) {
      const payload: Payload = {
        id: user.id,
        login: user.login,
      };
      const token = this.jwtService.sign(payload, this.utilsService.getEnvVar('SECRET'), { expiresIn: '1d' });
      const refreshToken = this.jwtService.sign(payload, this.utilsService.getEnvVar('REFRESH_SECRET'), { expiresIn: '7d' });
      await this.userDAL.update(user.id, { refresh_token: refreshToken });

      return {
        success: true,
        data: {
          token: `Bearer ${token}`,
          refreshToken,
        },
      };
    }

    return {
      success: false,
      data: { password: 'Password is invalid' },
    };
  }

  public async refreshToken(refreshToken: string): Promise<{ success: boolean; data: { [key: string]: string } }> {
    let decoded: Payload & VerifyAdditions;
    try {
      decoded = this.jwtService.verify<Payload>(refreshToken, this.utilsService.getEnvVar('REFRESH_SECRET'));
    } catch (err) {
      return {
        success: false,
        data: {
          refreshToken: 'Invalid token',
        },
      };
    }
    const user = await this.userDAL.findOne({ id: decoded.id, refresh_token: refreshToken });
    if (user) {
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        await this.userDAL.update(user.id, { refresh_token: null });
        return {
          success: false,
          data: {
            refreshToken: 'Token is expired',
          },
        };
      }
      const payload: Payload = {
        id: user.id,
        login: user.login,
      };
      const newToken = this.jwtService.sign(payload, this.utilsService.getEnvVar('SECRET'), { expiresIn: '1d' });
      const newRefreshToken = this.jwtService.sign(payload, this.utilsService.getEnvVar('REFRESH_SECRET'), { expiresIn: '7d' });
      await this.userDAL.update(user.id, { refresh_token: newRefreshToken });
      return {
        success: true,
        data: {
          token: `Bearer ${newToken}`,
          refreshToken: newRefreshToken,
        },
      };
    }
    return {
      success: false,
      data: {
        refreshToken: 'Token is not found',
      },
    };
  }

  public async deleteToken(refreshToken: string): Promise<{ success: boolean; data?: { [key: string]: string } }> {
    let decoded: Payload & VerifyAdditions;
    try {
      decoded = this.jwtService.verify(refreshToken, this.utilsService.getEnvVar('REFRESH_SECRET'));
    } catch (err) {
      return {
        success: false,
        data: {
          refreshToken: 'Invalid token',
        },
      };
    }
    const user = await this.userDAL.findOne({ id: decoded.id, refresh_token: refreshToken });
    if (user) {
      await this.userDAL.update(user.id, { refresh_token: null });
      return {
        success: true,
      };
    }
    return {
      success: false,
      data: {
        refreshToken: 'Token is not found',
      },
    };
  }
}
