-- AlterTable
ALTER TABLE "Plan" ADD COLUMN     "goalInRound" TEXT;

-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "statusId" SET DEFAULT 0;
