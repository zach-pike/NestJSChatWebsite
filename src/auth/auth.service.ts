import { Injectable, HttpCode } from '@nestjs/common';
import { AuthInfoDTO, User, UserJWTObject, JWTRefreshObject } from './user.dto';
import * as bcrypt from "bcrypt";
import * as JWT from 'jsonwebtoken';

import { database } from "../firebase-app"
import { firestore } from 'firebase-admin';

@Injectable()
export class AuthService {
  private signature_key = "testkey"
  private refresh_signature_key = "testfjkdfcks"
  private refreshTokens: string[] = []

  signObject(user: UserJWTObject): string {
    return JWT.sign(user, this.signature_key, { expiresIn: '5m' })
  }

  signRefreshObject(obj: JWTRefreshObject): string {
    return JWT.sign(obj, this.refresh_signature_key);
  }

  async fetchUserByUsername(username: string): Promise<[ User, string] | undefined> {
    let query = await database.collection("users").where('username', '==', username).get();

    if (query.size == 0) return null;

    let user: User = query.docs[0].data() as User;
    return [ user, query.docs[0].id ];
  }

  async fetchUserByUUID(uuid: string): Promise<User | undefined> {
    let query = await database.collection("users").doc(uuid).get();

    if (!query) return null;

    let user: User = query.data() as User;
    return user;
  }

  async login(username: string, password: string): 
  Promise<[ Error, { accessToken: string, refreshToken: string } ]> {
    let [ user, id ] = await this.fetchUserByUsername(username);

    if (user == null) [ new Error("No user found!"), null ];

    let valid = await bcrypt.compare(password, user.password_hash);

    if (!valid) return [ new Error("Incorrect password!"), null ];

    let accessToken = this.signObject({
        username: user.username,
        uuid: id,
        admin: user.admin
      })
    let refreshToken = this.signRefreshObject({
        uuid: id
    })

    this.refreshTokens.push(refreshToken);

    return [ null, {
      accessToken,
      refreshToken
    }];

  }

  async refresh(refreshToken: string): Promise<string | undefined> {
    if (!this.refreshTokens.includes(refreshToken)) return null;

    let user = this.checkJWTRefresh(refreshToken);

    if (!user) return null;

    let { uuid } = user;

    let { username, admin } = await this.fetchUserByUUID(uuid);

    return this.signObject({
      username,
      admin,
      uuid
    })
  }

  async register(username: string, password: string, real_name: string) {
    let hash = await bcrypt.hash(password, 10);

    let user: User = {
      username,
      real_name,
      password_hash: hash,
      admin: false
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

  checkJWTRefresh<T = JWTRefreshObject>(refresh: string): T | undefined {
    try {
      return JWT.verify(refresh, this.refresh_signature_key) as T;
    } catch(e) {
      return null;
    }
  }
}
