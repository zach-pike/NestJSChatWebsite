import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './chat/chat.module';
import { AuthModule } from './auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [ChatModule, AuthModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "frontend", "dist")
  }),
    AdminModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
