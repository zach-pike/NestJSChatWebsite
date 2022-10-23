import { Injectable } from '@nestjs/common';
import { database } from '../firebase-app';
import { Post } from './chat.types';

@Injectable()
export class ChatService {
  async addMessage(v: Post) {
    await database.collection("posts").add(v);
  }

  async getAllMessages(): Promise<Post[]> {
    return (await database.collection("posts").get()).docs.map(d => d.data() as Post)
  }
}
