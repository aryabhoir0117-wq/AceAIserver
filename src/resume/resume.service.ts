import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { extractText } from '../utils/extract-text';
import { AiService } from '../ai/ai.service';

@Injectable()
export class ResumeService {
  constructor( private prisma: PrismaService,
  private aiService: AiService,) {}

 async upload(file: Express.Multer.File) {

  // 1. Save resume to database
  const resume = await this.prisma.resume.create({
    data: {
      fileUrl: file.path,
      userId: 'cmrmba5pp00009uj84v722an2',
    },
  });

  // 2. Extract text from PDF/DOCX
  const extractedText = await extractText(file);

  // 3. Clean the extracted text
  const cleanedText = extractedText
    .replace(/\r/g, '')
    .replace(/\n{2,}/g, '\n')
    .replace(/[ \t]{2,}/g, ' ')
    .trim();

  // 4. Generate AI questions
  const questions = await this.aiService.generateQuestions(cleanedText);

  // 5. Return response
  return {
    message: 'Resume uploaded successfully',
    resume,
    extractedText: cleanedText,
    questions,
  };
}
}