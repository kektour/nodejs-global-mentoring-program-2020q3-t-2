export interface Payload {
  id: string;
  login: string;
}

export interface AuthService {
  login(login: string, password: string): Promise<{ success: boolean; data: { [key: string]: string } }>;
  refreshToken(refreshToken: string): Promise<{ success: boolean; data: { [key: string]: string } }>;
  deleteToken(token: string): Promise<{ success: boolean; data?: { [key: string]: string } }>;
}
