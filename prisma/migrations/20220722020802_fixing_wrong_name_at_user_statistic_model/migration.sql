/*
  Warnings:

  - You are about to drop the `UserStatistic` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `UserStatistic` DROP FOREIGN KEY `UserStatistic_userId_fkey`;

-- DropTable
DROP TABLE `UserStatistic`;

-- CreateTable
CREATE TABLE `userStatistics` (
    `id` VARCHAR(191) NOT NULL,
    `comments` INTEGER NOT NULL DEFAULT 0,
    `likes` INTEGER NOT NULL DEFAULT 0,
    `postsCreated` INTEGER NOT NULL DEFAULT 0,
    `categoriesCreated` INTEGER NOT NULL DEFAULT 0,
    `userId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `userStatistics` ADD CONSTRAINT `userStatistics_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
