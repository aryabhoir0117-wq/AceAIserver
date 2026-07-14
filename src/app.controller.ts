import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHealth() {
    return {
      status: 'running',
      message: 'ACEIntervuAI Backend',
    };
  }
}