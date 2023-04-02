/*
  Warnings:

  - A unique constraint covering the columns `[id,userId,title]` on the table `Note` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[noteId,name]` on the table `Title` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Note_id_userId_title_key" ON "Note"("id", "userId", "title");

-- CreateIndex
CREATE UNIQUE INDEX "Title_noteId_name_key" ON "Title"("noteId", "name");
