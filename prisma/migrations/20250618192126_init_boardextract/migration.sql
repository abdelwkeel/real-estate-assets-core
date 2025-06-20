-- CreateTable
CREATE TABLE "DecisionType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "DecisionType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BoardExtract" (
    "id" SERIAL NOT NULL,
    "decisionNumber" TEXT NOT NULL,
    "decisionDate" TIMESTAMP(3) NOT NULL,
    "decisionTypeId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "fileUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" INTEGER NOT NULL,

    CONSTRAINT "BoardExtract_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DecisionType_name_key" ON "DecisionType"("name");

-- AddForeignKey
ALTER TABLE "BoardExtract" ADD CONSTRAINT "BoardExtract_decisionTypeId_fkey" FOREIGN KEY ("decisionTypeId") REFERENCES "DecisionType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoardExtract" ADD CONSTRAINT "BoardExtract_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
