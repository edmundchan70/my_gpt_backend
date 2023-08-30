-- DropIndex
DROP INDEX "conversation_doc_id_owner_id_key";

-- AlterTable
ALTER TABLE "conversation" ADD COLUMN     "conversation_id" SERIAL NOT NULL,
ADD CONSTRAINT "conversation_pkey" PRIMARY KEY ("conversation_id");
