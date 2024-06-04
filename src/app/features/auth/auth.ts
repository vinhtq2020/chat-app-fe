export interface AuthService {
  login(
    email: string,
    password: string,
    userAgent: string,
    ip: string,
    deviceId: string
  ): Promise<number>;
  register(user: Account): Promise<number>;
  logout(deviceId: string, ip: string, userAgent: string): Promise<number>;
  getIP(): Promise<{ ip: string }>;
  refresh(deviceId: string, ip: string, userAgent: string): Promise<number>;
}

export interface Token {
  accessToken: string;
  refreshToken: string;
  userId: string;
  tokenType: string;
  expires: number;
}

export interface Account {
  id?: string;
  username?: string;
  password?: string;
  confirmPassword?: string;
  email?: string;
  phone?: string;
}

export interface UserInfo {
  id?: string;
  username: string;
  email?: string;
  student?: string;
  address?: string;
  avatar?: string;
}
