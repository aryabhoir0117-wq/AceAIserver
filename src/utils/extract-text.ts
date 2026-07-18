import fs from 'fs';
import pdf from 'pdf-parse';
import mammoth from 'mammoth';

export async function extractText(
  file: Express.Multer.File,
): Promise<string> {
  console.log('File Path:', file.path);
  console.log('Mime Type:', file.mimetype);

  const buffer = fs.readFileSync(file.path);

  if (file.mimetype === 'application/pdf') {
    const data = await pdf(buffer);
    return data.text;
  }

  if (
    file.mimetype ===
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ) {
    const result = await mammoth.extractRawText({
      buffer,
    });

    return result.value;
  }

  throw new Error('Unsupported file type. Please upload PDF or DOCX.');
}