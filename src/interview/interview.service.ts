import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AiService } from '../ai/ai.service';

@Injectable()
export class InterviewService {
  constructor(
    private prisma: PrismaService,
    private aiService: AiService,
  ) {}
  async startInterview(userId: string, resumeId: string, resumeText: string) {
  const questions =
    await this.aiService.generateQuestions(resumeText);

  const interview =
    await this.prisma.interviewSession.create({
      data: {
        userId,
        resumeId,
        questions,
      },
    });

  return interview;
}
}
