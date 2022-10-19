import { Inject } from '@nestjs/common';
import { ChatService } from './chat.service';
import { AuthService } from '../auth/auth.service';
import { Post } from './chat.service';

import {
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  WebSocketGateway,
  ConnectedSocket
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class ChatGateway {
  constructor(
    @Inject(ChatService)
    private chatService: ChatService,
    private authService: AuthService
  ) {}
  
  @WebSocketServer()
  server: Server;
  
  @SubscribeMessage('message')
  handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() content: string
  ) {
    let auth = client.handshake.headers["authorization"];
    if (auth == null) return;
    let user = this.authService.checkJWTBearer(auth);
    if (user == null) return;

    this.chatService.addMessage({
      author: user.username,
      content
    });
    this.server.emit('message', {
      author: user.username,
      content
    });
  }
}