/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "document" (
    "doc_id" TEXT NOT NULL,
    "owner_id" INTEGER NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "document_pkey" PRIMARY KEY ("doc_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "document" ADD CONSTRAINT "document_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
