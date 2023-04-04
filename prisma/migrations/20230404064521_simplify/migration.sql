/*
  Warnings:

  - You are about to drop the column `content` on the `Note` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `Note` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `Note` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Note` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Note` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[todoId,id]` on the table `Note` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `detail` to the `Note` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Todo_category_key";

-- AlterTable
ALTER TABLE "Note" DROP COLUMN "content",
DROP COLUMN "date",
DROP COLUMN "time",
DROP COLUMN "title",
DROP COLUMN "updatedAt",
ADD COLUMN     "detail" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Note_todoId_id_key" ON "Note"("todoId", "id");
