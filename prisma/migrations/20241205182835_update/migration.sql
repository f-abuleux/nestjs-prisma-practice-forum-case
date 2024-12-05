/*
  Warnings:

  - A unique constraint covering the columns `[userUser_id]` on the table `Comment` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `comment` ADD COLUMN `userUser_id` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Comment_userUser_id_key` ON `Comment`(`userUser_id`);

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_userUser_id_fkey` FOREIGN KEY (`userUser_id`) REFERENCES `User`(`user_id`) ON DELETE SET NULL ON UPDATE CASCADE;
