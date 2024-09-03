-- CreateTable
CREATE TABLE `Billinfo` (
    `orderid` INTEGER NOT NULL AUTO_INCREMENT,
    `orderdetails` VARCHAR(191) NOT NULL,
    `amount` DOUBLE NOT NULL,

    PRIMARY KEY (`orderid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
