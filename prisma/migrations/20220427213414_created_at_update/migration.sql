/*
  Warnings:

  - You are about to drop the column `create_at` on the `user` table. All the data in the column will be lost.
  - Added the required column `created_at` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `create_at`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL;

-- RenameIndex
ALTER TABLE `user` RENAME INDEX `User_login_key` TO `user_login_key`;
