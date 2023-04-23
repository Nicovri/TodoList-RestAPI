-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "isFinished" BOOLEAN NOT NULL,
    "priority" INTEGER NOT NULL
);
