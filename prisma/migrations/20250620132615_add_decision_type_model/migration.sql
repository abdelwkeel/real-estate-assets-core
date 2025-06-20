-- CreateTable
CREATE TABLE "DecisionType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "DecisionType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BoardDecision" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "createdById" INTEGER NOT NULL,
    "decisionTypeId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BoardDecision_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BoardDecision" ADD CONSTRAINT "BoardDecision_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoardDecision" ADD CONSTRAINT "BoardDecision_decisionTypeId_fkey" FOREIGN KEY ("decisionTypeId") REFERENCES "DecisionType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
