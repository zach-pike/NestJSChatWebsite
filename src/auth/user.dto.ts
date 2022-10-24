export interface UserJWTObject {
  username: string;
  uuid: string;
  admin: boolean;
}

export interface JWTRefreshObject {
  uuid: string;
}

export class AuthInfoDTO {
  username: string;
  password: string;
}

export class SignupInfoDTO {
  username: string;
  real_name: string;
  password: string;
}

export interface User {
  username: string;
  real_name: string;
  password_hash: string;
  admin: boolean;
}