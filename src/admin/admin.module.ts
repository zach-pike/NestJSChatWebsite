import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { AuthModule } from 'src/auth/auth.module';
import { ChatModule } from 'src/chat/chat.module';

@Module({
  providers: [AdminService],
  controllers: [AdminController],
  imports: [AuthModule, ChatModule]
})
export class AdminModule {}
