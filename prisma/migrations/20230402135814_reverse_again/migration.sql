/*
  Warnings:

  - You are about to drop the column `con` on the `Content` table. All the data in the column will be lost.
  - You are about to drop the column `desc` on the `Note` table. All the data in the column will be lost.
  - You are about to drop the `Todo` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Note` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `desc` to the `Content` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content` to the `Note` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Todo" DROP CONSTRAINT "Todo_noteId_fkey";

-- DropForeignKey
ALTER TABLE "Todo" DROP CONSTRAINT "Todo_userId_fkey";

-- AlterTable
ALTER TABLE "Content" DROP COLUMN "con",
ADD COLUMN     "desc" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Note" DROP COLUMN "desc",
ADD COLUMN     "content" TEXT NOT NULL;

-- DropTable
DROP TABLE "Todo";

-- CreateTable
CREATE TABLE "Title" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "noteId" INTEGER NOT NULL,

    CONSTRAINT "Title_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Note_userId_key" ON "Note"("userId");

-- AddForeignKey
ALTER TABLE "Title" ADD CONSTRAINT "Title_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Title" ADD CONSTRAINT "Title_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "Note"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
