/*
  Warnings:

  - Added the required column `FileName` to the `document` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "document" ADD COLUMN     "FileName" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "TextChunk" (
    "textChunk_id" SERIAL NOT NULL,
    "doc_id" TEXT NOT NULL,
    "text_chunk" TEXT NOT NULL,

    CONSTRAINT "TextChunk_pkey" PRIMARY KEY ("textChunk_id")
);

-- AddForeignKey
ALTER TABLE "TextChunk" ADD CONSTRAINT "TextChunk_doc_id_fkey" FOREIGN KEY ("doc_id") REFERENCES "document"("doc_id") ON DELETE RESTRICT ON UPDATE CASCADE;
