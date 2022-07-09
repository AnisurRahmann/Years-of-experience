/*
  Warnings:

  - You are about to drop the column `public` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "public",
ADD COLUMN     "is_public" BOOLEAN NOT NULL DEFAULT false;
