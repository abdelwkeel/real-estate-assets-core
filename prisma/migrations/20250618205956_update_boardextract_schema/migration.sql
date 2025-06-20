/*
  Warnings:

  - You are about to drop the column `decisionDate` on the `BoardExtract` table. All the data in the column will be lost.
  - You are about to drop the column `decisionNumber` on the `BoardExtract` table. All the data in the column will be lost.
  - You are about to drop the column `decisionTypeId` on the `BoardExtract` table. All the data in the column will be lost.
  - You are about to drop the `DecisionType` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `extractDate` to the `BoardExtract` table without a default value. This is not possible if the table is not empty.
  - Added the required column `extractNumber` to the `BoardExtract` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BoardExtract" DROP CONSTRAINT "BoardExtract_decisionTypeId_fkey";

-- AlterTable
ALTER TABLE "BoardExtract" DROP COLUMN "decisionDate",
DROP COLUMN "decisionNumber",
DROP COLUMN "decisionTypeId",
ADD COLUMN     "extractDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "extractNumber" TEXT NOT NULL;

-- DropTable
DROP TABLE "DecisionType";
