export interface AuthStateModel {
  initialized: boolean;
  user: User;
  jwt: string;
}

export interface User {
  username: string;
  email: string;
  createAt: Date;
}
