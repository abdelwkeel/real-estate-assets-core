/*
  Warnings:

  - Added the required column `decisionDate` to the `BoardDecision` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BoardDecision" ADD COLUMN     "decisionDate" TIMESTAMP(3) NOT NULL;
