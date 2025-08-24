/*
  Warnings:

  - You are about to drop the `CSV` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."CSV" DROP CONSTRAINT "CSV_userId_fkey";

-- DropTable
DROP TABLE "public"."CSV";

-- CreateTable
CREATE TABLE "public"."Csv" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Csv_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Csv" ADD CONSTRAINT "Csv_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
