export interface UserJWTObject {
  username: string;
  uuid: string;
}

export class AuthInfoDTO {
  username: string;
  password: string;
}

export interface User {
  username: string;
  password: string;
  uuid:     string;
}