CREATE TYPE "ReportReason" AS ENUM (
    'DUPLICATE_RECORD',
    'IRRELEVANT_RECORD',
    'INAPPROPRIATE_IMAGE',
    'AD_SPAM',
    'PERSONAL_INFO',
    'INCORRECT_INFO',
    'OTHER'
);

CREATE TABLE "Report" (
    "id" TEXT NOT NULL,
    "reason" "ReportReason" NOT NULL,
    "itemId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Report_itemId_userId_key" ON "Report"("itemId", "userId");
CREATE INDEX "Report_itemId_idx" ON "Report"("itemId");
CREATE INDEX "Report_userId_idx" ON "Report"("userId");
CREATE INDEX "Report_createdAt_idx" ON "Report"("createdAt");

ALTER TABLE "Report" ADD CONSTRAINT "Report_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Report" ADD CONSTRAINT "Report_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
