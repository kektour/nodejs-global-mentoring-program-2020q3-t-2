export interface SignOptions {
  expiresIn: string;
}

export interface VerifyAdditions {
  exp: number;
}

export interface JwtService {
  sign(payload: { [key: string]: any }, secret: string, options: SignOptions): string;
  verify<T = { [key: string]: any }>(token: string, secret: string): T & VerifyAdditions;
}
