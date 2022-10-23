import { Injectable, HttpCode } from '@nestjs/common';
import { AuthInfoDTO, User, UserJWTObject } from './user.dto';
import * as bcrypt from "bcrypt";
import * as JWT from 'jsonwebtoken';

import { database } from "../firebase-app"
import { firestore } from 'firebase-admin';

@Injectable()
export class AuthService {
  private signature_key = "testkey"

  async login(username: string, password: string): Promise<[ Error, string ]> {
    let query = await database.collection("users").where('username', '==', username).get()

    if (query.size == 0) return [ new Error("No user found!"), null ];

    let user = query.docs[0].data() as User;
    let id = query.docs[0].id;

    let valid = await bcrypt.compare(password, user.password_hash);

    if (!valid) return [ new Error("Incorrect password!"), null ];

    let jwt_obj: UserJWTObject = {
      username: user.username,
      uuid: id
    }

    const key = JWT.sign(jwt_obj, this.signature_key);

    return [ null, key ];

  }

  async register(username: string, password: string, real_name: string) {
    let hash = await bcrypt.hash(password, 10);

    let user: User = {
      username,
      real_name,
      password_hash: hash
    }

    await database.collection("users").add(user);
  }

  checkJWTBearer<T = UserJWTObject>(token: string): T | undefined {
    try {
      return JWT.verify(token.replace("Bearer ", ""), this.signature_key) as T;
    } catch(e) {
      return null;
    }
  }
}
