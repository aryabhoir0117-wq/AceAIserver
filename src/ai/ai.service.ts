import { Injectable } from '@nestjs/common';

@Injectable()
export class AiService {
  async generateQuestions(resumeText: string) {
    const prompt = `
You are a senior software engineer interviewer.

Resume:

...

Questions:

...

Candidate Answers:

...

Evaluate the candidate.

Return JSON:

{
score:85,
communication:90,
technical:78,
confidence:80,
strengths:[...],
weaknesses:[...],
improvements:[...]
}
`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }),
      },
    );

    const data = await response.json();

    return data.candidates[0].content.parts[0].text;
  }
}