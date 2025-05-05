-- CreateTable
CREATE TABLE `expense_user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `percentage` DOUBLE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `userId` INTEGER NOT NULL,
    `expenseId` INTEGER NOT NULL,

    UNIQUE INDEX `expense_user_userId_expenseId_key`(`userId`, `expenseId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `expense_user` ADD CONSTRAINT `expense_user_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `expense_user` ADD CONSTRAINT `expense_user_expenseId_fkey` FOREIGN KEY (`expenseId`) REFERENCES `expense`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
