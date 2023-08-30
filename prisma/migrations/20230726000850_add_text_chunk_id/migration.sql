-- DropIndex
DROP INDEX "TextChunk_doc_id_owner_id_key";

-- AlterTable
ALTER TABLE "TextChunk" ADD COLUMN     "text_chunk_id" SERIAL NOT NULL,
ADD CONSTRAINT "TextChunk_pkey" PRIMARY KEY ("text_chunk_id");
