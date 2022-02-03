-- AlterTable
ALTER TABLE `User` ADD COLUMN `role` ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER';

-- CreateTable
CREATE TABLE `Reports` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `truckmodel` VARCHAR(191) NOT NULL,
    `author` VARCHAR(191) NOT NULL,
    `grossWeight` DOUBLE NOT NULL,
    `truckWeight` DOUBLE NOT NULL,
    `Rice` INTEGER NOT NULL,
    `Darak1` INTEGER NOT NULL,
    `Darak3` INTEGER NOT NULL,
    `Binlid` INTEGER NOT NULL,
    `Sorter` INTEGER NOT NULL,

    UNIQUE INDEX `Reports_truckmodel_key`(`truckmodel`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
