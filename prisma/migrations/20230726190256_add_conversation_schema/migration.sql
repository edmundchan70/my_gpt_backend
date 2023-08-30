/*
  Warnings:

  - Added the required column `role` to the `conversation` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "conversation_role" AS ENUM ('AI', 'HUMAN');

-- AlterTable
ALTER TABLE "conversation" ADD COLUMN     "role" "conversation_role" NOT NULL;
