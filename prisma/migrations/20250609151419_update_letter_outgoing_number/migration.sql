/*
  Warnings:

  - You are about to drop the column `Status` on the `Letter` table. All the data in the column will be lost.
  - Added the required column `OutgoingNumber` to the `Letter` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Letter" DROP COLUMN "Status",
ADD COLUMN     "OutgoingNumber" TEXT NOT NULL;
