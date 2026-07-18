import { Module } from '@nestjs/common';
import { InterviewService } from './interview.service';
import { InterviewController } from './interview.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { AiModule } from '../ai/ai.module';

@Module({
  imports: [PrismaModule, AiModule], // <-- AiModule must be here
  controllers: [InterviewController],
  providers: [InterviewService],
})
export class InterviewModule {}