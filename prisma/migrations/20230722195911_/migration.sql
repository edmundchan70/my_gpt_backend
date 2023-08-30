/*
  Warnings:

  - A unique constraint covering the columns `[owner_id,FileName]` on the table `document` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "document_owner_id_FileName_key" ON "document"("owner_id", "FileName");
