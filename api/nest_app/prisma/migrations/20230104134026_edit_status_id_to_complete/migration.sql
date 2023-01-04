/*
  Warnings:

  - You are about to drop the `Status` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_statusId_fkey";

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "complete" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "Status";
