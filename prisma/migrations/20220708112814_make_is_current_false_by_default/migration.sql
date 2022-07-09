/*
  Warnings:

  - Made the column `is_current` on table `WorkExperience` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "WorkExperience" ALTER COLUMN "is_current" SET NOT NULL,
ALTER COLUMN "is_current" SET DEFAULT false;
