import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { JwtConfigModule } from './jwt/jwt.module';
import { ResumeModule } from './resume/resume.module';
import { InterviewModule } from './interview/interview.module';
import { AiModule } from './ai/ai.module';
@Module({
  imports: [
  ConfigModule.forRoot({
  isGlobal: true,
}),

    PrismaModule,
    UsersModule,
    AuthModule,
    JwtConfigModule,
    ResumeModule,
    InterviewModule,
    AiModule,
  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
process.env.GEMINI_API_KEY