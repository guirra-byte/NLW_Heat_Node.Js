/*
  Warnings:

  - You are about to drop the column `udpated_at` on the `user` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `udpated_at`,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL;
