/*
  Warnings:

  - You are about to drop the column `RecipientEntity` on the `Letter` table. All the data in the column will be lost.
  - You are about to drop the column `SenderName` on the `Letter` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Letter" DROP COLUMN "RecipientEntity",
DROP COLUMN "SenderName";

-- CreateTable
CREATE TABLE "InternalSector" (
    "SectorID" SERIAL NOT NULL,
    "SectorName" TEXT NOT NULL,

    CONSTRAINT "InternalSector_pkey" PRIMARY KEY ("SectorID")
);

-- CreateTable
CREATE TABLE "GovernmentAuthority" (
    "AuthorityID" SERIAL NOT NULL,
    "AuthorityName" TEXT NOT NULL,

    CONSTRAINT "GovernmentAuthority_pkey" PRIMARY KEY ("AuthorityID")
);

-- CreateIndex
CREATE UNIQUE INDEX "InternalSector_SectorName_key" ON "InternalSector"("SectorName");

-- CreateIndex
CREATE UNIQUE INDEX "GovernmentAuthority_AuthorityName_key" ON "GovernmentAuthority"("AuthorityName");
