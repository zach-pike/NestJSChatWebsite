import { Injectable } from '@nestjs/common';
import { Post } from './chat.types';

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
