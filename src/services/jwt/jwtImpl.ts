import jwt from 'jsonwebtoken';
import { JwtService, SignOptions, VerifyAdditions } from './jwt';

export class JwtServiceImpl implements JwtService {
  public sign(payload: { [key: string]: any }, secret: string, options: SignOptions): string {
    return jwt.sign(payload, secret, options);
  }

  public verify<T = { [key: string]: any }>(token: string, secret: string): T & VerifyAdditions {
    return <T & VerifyAdditions>jwt.verify(token, secret);
  }
}
