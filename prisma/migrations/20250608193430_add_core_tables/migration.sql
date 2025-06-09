-- CreateTable
CREATE TABLE "Auction" (
    "AuctionID" SERIAL NOT NULL,
    "PropertyID" INTEGER NOT NULL,
    "StartingPrice" DOUBLE PRECISION NOT NULL,
    "FinalPrice" DOUBLE PRECISION,
    "PaymentPlan" TEXT NOT NULL,
    "Installments" TEXT,
    "AppraisalCompanies" TEXT[],
    "ExpertEvaluatorID" INTEGER NOT NULL,
    "AuctionDocuments" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Auction_pkey" PRIMARY KEY ("AuctionID")
);

-- CreateTable
CREATE TABLE "Letter" (
    "LetterID" SERIAL NOT NULL,
    "SenderName" TEXT NOT NULL,
    "RecipientType" TEXT NOT NULL,
    "RecipientEntity" TEXT NOT NULL,
    "DateSent" TIMESTAMP(3) NOT NULL,
    "Status" TEXT NOT NULL,
    "AttachedFiles" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Letter_pkey" PRIMARY KEY ("LetterID")
);

-- CreateTable
CREATE TABLE "BoardExtract" (
    "ExtractID" SERIAL NOT NULL,
    "Title" TEXT NOT NULL,
    "Description" TEXT NOT NULL,
    "DateIssued" TIMESTAMP(3) NOT NULL,
    "AttachedFiles" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BoardExtract_pkey" PRIMARY KEY ("ExtractID")
);

-- CreateTable
CREATE TABLE "BoardDecision" (
    "DecisionID" SERIAL NOT NULL,
    "Title" TEXT NOT NULL,
    "Content" TEXT NOT NULL,
    "DateIssued" TIMESTAMP(3) NOT NULL,
    "AttachedFiles" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BoardDecision_pkey" PRIMARY KEY ("DecisionID")
);

-- AddForeignKey
ALTER TABLE "Auction" ADD CONSTRAINT "Auction_PropertyID_fkey" FOREIGN KEY ("PropertyID") REFERENCES "Property"("PropertyID") ON DELETE RESTRICT ON UPDATE CASCADE;
