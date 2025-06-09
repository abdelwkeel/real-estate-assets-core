/*
  Warnings:

  - Added the required column `Subject` to the `Letter` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Letter" ADD COLUMN     "Subject" TEXT NOT NULL;
