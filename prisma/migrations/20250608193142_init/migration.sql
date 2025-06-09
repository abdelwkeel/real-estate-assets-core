-- CreateTable
CREATE TABLE "Property" (
    "PropertyID" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,
    "Location" TEXT NOT NULL,
    "OwnerCompanyID" INTEGER NOT NULL,
    "Status" TEXT NOT NULL,
    "LegalStatus" TEXT NOT NULL,
    "UtilizationStatus" TEXT NOT NULL,
    "Governorate" TEXT NOT NULL,
    "Images" TEXT[],
    "Documents" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Property_pkey" PRIMARY KEY ("PropertyID")
);

-- CreateTable
CREATE TABLE "Company" (
    "CompanyID" SERIAL NOT NULL,
    "CompanyName" TEXT NOT NULL,
    "AffiliationLaw" TEXT NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("CompanyID")
);

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_OwnerCompanyID_fkey" FOREIGN KEY ("OwnerCompanyID") REFERENCES "Company"("CompanyID") ON DELETE RESTRICT ON UPDATE CASCADE;
