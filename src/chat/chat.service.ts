import { Injectable } from '@nestjs/common';

export interface Post {
  author: string;
  content: string;
}

@Injectable()
export class ChatService {
  messages: Post[] = [];
  
  addMessage(v: Post) {
    this.messages.push(v);
  }

  getAllMessages(): Post[] {
    return this.messages;
  }
}
