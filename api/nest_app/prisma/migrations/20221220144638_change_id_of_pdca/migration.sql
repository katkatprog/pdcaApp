/*
  Warnings:

  - The primary key for the `Action` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Action` table. All the data in the column will be lost.
  - The primary key for the `Check` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Check` table. All the data in the column will be lost.
  - The primary key for the `Do` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Do` table. All the data in the column will be lost.
  - The primary key for the `Plan` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the column `planId` on the `Task` table. All the data in the column will be lost.
  - Added the required column `cycleId` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_planId_fkey";

-- AlterTable
ALTER TABLE "Action" DROP CONSTRAINT "Action_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Action_pkey" PRIMARY KEY ("cycleId", "round");

-- AlterTable
ALTER TABLE "Check" DROP CONSTRAINT "Check_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Check_pkey" PRIMARY KEY ("cycleId", "round");

-- AlterTable
ALTER TABLE "Do" DROP CONSTRAINT "Do_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Do_pkey" PRIMARY KEY ("cycleId", "round");

-- AlterTable
ALTER TABLE "Plan" DROP CONSTRAINT "Plan_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Plan_pkey" PRIMARY KEY ("cycleId", "round");

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "planId",
ADD COLUMN     "cycleId" INTEGER NOT NULL,
ADD COLUMN     "round" INTEGER NOT NULL DEFAULT 1;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_cycleId_fkey" FOREIGN KEY ("cycleId") REFERENCES "Cycle"("id") ON DELETE CASCADE ON UPDATE CASCADE;
