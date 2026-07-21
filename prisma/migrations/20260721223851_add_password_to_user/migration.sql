/*
  Warnings:

  - You are about to drop the column `color` on the `activities` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "activities" DROP COLUMN "color";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "password" TEXT;
