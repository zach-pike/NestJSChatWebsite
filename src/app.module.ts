import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './chat/chat.module';
import { SpaModule } from './spa/spa.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ChatModule, SpaModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
