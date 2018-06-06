export interface AuthStateModel {
  initialized: boolean;
  user: User;
  jwt: string;
  errors: any;
  isPending: boolean;
}

export interface User {
  username: string;
  email: string;
  createAt: Date;
}

export interface Authenticate {
  username: string;
  password: string;
}

export interface Authenticated extends User {
  jwt: string;
}

export interface Signon {
  username: string;
  email: string;
  password: string;
}
