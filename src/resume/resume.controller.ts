import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ResumeService } from './resume.service';

@Controller('resume')
export class ResumeController {
  constructor(private readonly resumeService: ResumeService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('resume', {
      dest: './uploads',
    }),
  )
  uploadResume(
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.resumeService.upload(file);
  }
}