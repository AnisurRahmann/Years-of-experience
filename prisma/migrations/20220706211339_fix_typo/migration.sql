/*
  Warnings:

  - You are about to drop the column `introdcution` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "introdcution",
ADD COLUMN     "introduction" TEXT;
