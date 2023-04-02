/*
  Warnings:

  - You are about to drop the `Content` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Title` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `todoId` to the `Note` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Content" DROP CONSTRAINT "Content_noteId_fkey";

-- DropForeignKey
ALTER TABLE "Content" DROP CONSTRAINT "Content_userId_fkey";

-- DropForeignKey
ALTER TABLE "Title" DROP CONSTRAINT "Title_noteId_fkey";

-- DropForeignKey
ALTER TABLE "Title" DROP CONSTRAINT "Title_userId_fkey";

-- DropIndex
DROP INDEX "Note_id_userId_title_key";

-- AlterTable
ALTER TABLE "Note" ADD COLUMN     "todoId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Content";

-- DropTable
DROP TABLE "Title";

-- CreateTable
CREATE TABLE "Todo" (
    "id" SERIAL NOT NULL,
    "category" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Todo" ADD CONSTRAINT "Todo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_todoId_fkey" FOREIGN KEY ("todoId") REFERENCES "Todo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
