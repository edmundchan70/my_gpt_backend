-- CreateTable
CREATE TABLE "conversation" (
    "doc_id" TEXT NOT NULL,
    "owner_id" INTEGER NOT NULL,
    "MessageTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Message" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "conversation_doc_id_owner_id_key" ON "conversation"("doc_id", "owner_id");

-- AddForeignKey
ALTER TABLE "conversation" ADD CONSTRAINT "conversation_doc_id_fkey" FOREIGN KEY ("doc_id") REFERENCES "document"("doc_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conversation" ADD CONSTRAINT "conversation_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
