/*
  Warnings:

  - You are about to drop the column `albumsId` on the `Favorite` table. All the data in the column will be lost.
  - You are about to drop the column `tracksId` on the `Favorite` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Favorite" DROP CONSTRAINT "Favorite_albumsId_fkey";

-- DropForeignKey
ALTER TABLE "Favorite" DROP CONSTRAINT "Favorite_tracksId_fkey";

-- AlterTable
ALTER TABLE "Favorite" DROP COLUMN "albumsId",
DROP COLUMN "tracksId",
ADD COLUMN     "albumId" TEXT,
ADD COLUMN     "trackId" TEXT;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track"("id") ON DELETE SET NULL ON UPDATE CASCADE;
