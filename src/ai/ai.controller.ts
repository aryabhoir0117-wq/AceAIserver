import { Controller, Get } from '@nestjs/common';
import { AiService } from './ai.service';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Get('test')
async test() {
  return this.aiService.generateQuestions(
    'This is a sample resume. Skills: Java, NestJS, React.'
  );
}
}