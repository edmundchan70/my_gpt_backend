/*
  Warnings:

  - The primary key for the `TextChunk` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `textChunk_id` on the `TextChunk` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[doc_id,owner_id]` on the table `TextChunk` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `owner_id` to the `TextChunk` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TextChunk" DROP CONSTRAINT "TextChunk_pkey",
DROP COLUMN "textChunk_id",
ADD COLUMN     "owner_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "TextChunk_doc_id_owner_id_key" ON "TextChunk"("doc_id", "owner_id");

-- AddForeignKey
ALTER TABLE "TextChunk" ADD CONSTRAINT "TextChunk_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
