import { Controller, Get, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('chat')
@UseGuards(AuthGuard)
export class ChatController {
  constructor(private readonly chatService: ChatService) {}
  
  @Get("getsent")
  async getMessages() {
    return await this.chatService.getAllMessages();
  }
}
