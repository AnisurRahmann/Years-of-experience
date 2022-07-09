-- AlterTable
ALTER TABLE "WorkExperience" ADD COLUMN     "is_current" BOOLEAN,
ADD COLUMN     "is_public" BOOLEAN NOT NULL DEFAULT false;
