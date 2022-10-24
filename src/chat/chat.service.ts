import { Injectable } from '@nestjs/common';
import { database } from '../firebase-app';
import { Post } from './chat.types';

@Injectable()
export class ChatService {
  async addMessage(v: Post) {
    let doc = await database.collection("posts").add(v);

    return doc.id;
  }

  async getAllMessages(): Promise<Post[]> {
    return (await database.collection("posts").get()).docs.map(d => {
      return { ...d.data() as any, id: d.id }
    })
  }
}
