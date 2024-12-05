/*
  Warnings:

  - Made the column `userUser_id` on table `comment` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `comment` DROP FOREIGN KEY `Comment_userUser_id_fkey`;

-- DropIndex
DROP INDEX `Comment_userUser_id_key` ON `comment`;

-- AlterTable
ALTER TABLE `comment` MODIFY `userUser_id` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_userUser_id_fkey` FOREIGN KEY (`userUser_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
