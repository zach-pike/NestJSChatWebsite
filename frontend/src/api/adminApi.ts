import type { UserWOPH } from "../../../src/auth/user.dto";
import { basicJsonGetRequest, basicJsonPostRequest } from "./requestFunctions";

export async function getAllUsers(token: string): Promise<[ Error, UserWOPH[] ]> {
    return basicJsonGetRequest<UserWOPH[]>('admin/getAllUsers', null, token);
}

export async function deletePublicPost(token: string, postId: string): Promise<Error | undefined> {
    let [ err, _resp ] = await basicJsonPostRequest<{}>('admin/delPubMessage', { postId }, token);
    return err;
  }