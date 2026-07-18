import { Body, Controller, Post } from '@nestjs/common';
import { InterviewService } from './interview.service';

@Controller('interview')
export class InterviewController {
  constructor(
    private readonly interviewService: InterviewService,
  ) {}

  @Post('start')
  async start(
    @Body()
    body: {
      userId: string;
      resumeId: string;
      resumeText: string;
    },
  ) {
    return this.interviewService.startInterview(
      body.userId,
      body.resumeId,
      body.resumeText,
    );
  }
}