/*
  Warnings:

  - A unique constraint covering the columns `[extractNumber]` on the table `BoardExtract` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "BoardExtract_extractNumber_key" ON "BoardExtract"("extractNumber");
