import { Module } from '@nestjs/common';
import { ResumeController } from './resume.controller';
import { ResumeService } from './resume.service';
import { PrismaModule } from '../prisma/prisma.module';
import { AiModule } from '../ai/ai.module';

@Module({
  imports: [
    PrismaModule,
    AiModule,          // ← IMPORTANT
  ],
  controllers: [ResumeController],
  providers: [ResumeService],
})
export class ResumeModule {}