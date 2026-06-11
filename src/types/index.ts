export interface ApiResponse<T = undefined> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface TokenPayload {
  userId: string;
  email: string;
}

export interface AuthUser {
  id: string;
  email: string;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface AuthSuccessData {
  token: string;
  user: AuthUser;
}

export interface UserRow {
  id: string;
  email: string;
  password_hash: string;
  created_at: Date;
}
