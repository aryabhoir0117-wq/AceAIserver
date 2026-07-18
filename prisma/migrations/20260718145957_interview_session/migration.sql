/*
  Warnings:

  - Added the required column `questions` to the `InterviewSession` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resumeId` to the `InterviewSession` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "InterviewSession" ADD COLUMN     "answers" JSONB,
ADD COLUMN     "feedback" TEXT,
ADD COLUMN     "questions" JSONB NOT NULL,
ADD COLUMN     "resumeId" TEXT NOT NULL,
ALTER COLUMN "score" SET DATA TYPE DOUBLE PRECISION;

-- AddForeignKey
ALTER TABLE "InterviewSession" ADD CONSTRAINT "InterviewSession_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
