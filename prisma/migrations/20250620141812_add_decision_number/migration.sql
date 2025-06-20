/*
  Warnings:

  - Added the required column `decisionNumber` to the `BoardDecision` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BoardDecision" ADD COLUMN     "decisionNumber" TEXT NOT NULL;
