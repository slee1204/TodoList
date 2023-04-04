/*
  Warnings:

  - You are about to drop the column `userId` on the `Note` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[category]` on the table `Todo` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Note" DROP CONSTRAINT "Note_userId_fkey";

-- AlterTable
ALTER TABLE "Note" DROP COLUMN "userId";

-- CreateIndex
CREATE UNIQUE INDEX "Todo_category_key" ON "Todo"("category");
