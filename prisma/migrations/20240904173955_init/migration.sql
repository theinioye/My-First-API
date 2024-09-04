-- CreateTable
CREATE TABLE "Office" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "location" TEXT NOT NULL,
    "employees" INTEGER NOT NULL,
    "founded" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "yearlyRevenue" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Office_location_key" ON "Office"("location");
