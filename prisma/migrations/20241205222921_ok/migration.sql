/*
  Warnings:

  - A unique constraint covering the columns `[comment_id]` on the table `comment` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `comment` DROP FOREIGN KEY `Comment_postPost_id_fkey`;

-- DropForeignKey
ALTER TABLE `comment` DROP FOREIGN KEY `Comment_userUser_id_fkey`;

-- DropForeignKey
ALTER TABLE `post` DROP FOREIGN KEY `Post_userUser_id_fkey`;

-- CreateIndex
CREATE UNIQUE INDEX `comment_comment_id_key` ON `comment`(`comment_id`);

-- AddForeignKey
ALTER TABLE `comment` ADD CONSTRAINT `comment_postPost_id_fkey` FOREIGN KEY (`postPost_id`) REFERENCES `post`(`post_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comment` ADD CONSTRAINT `comment_userUser_id_fkey` FOREIGN KEY (`userUser_id`) REFERENCES `user`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `post` ADD CONSTRAINT `post_userUser_id_fkey` FOREIGN KEY (`userUser_id`) REFERENCES `user`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `post` RENAME INDEX `Post_post_id_key` TO `post_post_id_key`;

-- RenameIndex
ALTER TABLE `user` RENAME INDEX `User_email_key` TO `user_email_key`;

-- RenameIndex
ALTER TABLE `user` RENAME INDEX `User_user_id_key` TO `user_user_id_key`;

-- RenameIndex
ALTER TABLE `user` RENAME INDEX `User_username_key` TO `user_username_key`;
