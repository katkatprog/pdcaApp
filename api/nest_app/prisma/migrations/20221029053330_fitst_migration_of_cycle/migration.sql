-- CreateTable
CREATE TABLE "Cycle" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "about" TEXT,
    "goal" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "favorite" BOOLEAN NOT NULL DEFAULT false,
    "watchFromAnyone" BOOLEAN NOT NULL DEFAULT false,
    "erased" BOOLEAN NOT NULL DEFAULT false,
    "currentRound" INTEGER NOT NULL DEFAULT 0,
    "suspend" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Cycle_pkey" PRIMARY KEY ("id")
);
