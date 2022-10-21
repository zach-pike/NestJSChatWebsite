import { Injectable, HttpCode } from '@nestjs/common';
import { AuthInfoDTO, User, UserJWTObject } from './user.dto';
import * as JWT from 'jsonwebtoken';

@Injectable()
export class AuthService {
  private users_db: User[] = [
    {
      username: "zachpike",
      password: "8212",
      uuid: "unique-user-id"
    }
  ];

  private signature_key = "testkey"

  login(username: string, password: string): [ Error, string ] {
    let user = this.users_db.find(u => 
      u.username == username && u.password == password
    );
    if (user == null) return [ new Error("Could not find user"), null ];

    const object: UserJWTObject = {
      username: user.username,
      uuid: user.uuid
    }

    const key = JWT.sign(object, this.signature_key);

    return [ null, key ];
  }

  checkJWTBearer<T = UserJWTObject>(token: string): T | undefined {
    try {
      return JWT.verify(token.replace("Bearer ", ""), this.signature_key) as T;
    } catch(e) {
      return null;
    }
  }
}
