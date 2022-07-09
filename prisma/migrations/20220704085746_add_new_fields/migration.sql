/*
  Warnings:

  - You are about to drop the column `position` on the `WorkExperience` table. All the data in the column will be lost.
  - Added the required column `profile_picture_url` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `company_logo_url` to the `WorkExperience` table without a default value. This is not possible if the table is not empty.
  - Added the required column `job_description` to the `WorkExperience` table without a default value. This is not possible if the table is not empty.
  - Added the required column `job_title` to the `WorkExperience` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "profile_picture_url" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "WorkExperience" DROP COLUMN "position",
ADD COLUMN     "company_logo_url" TEXT NOT NULL,
ADD COLUMN     "job_description" TEXT NOT NULL,
ADD COLUMN     "job_title" TEXT NOT NULL;
