# SQL statement to create the StandardUsers table
create_user_table_query = """
CREATE TABLE `Users` (
    `Id` CHAR(36) NOT NULL,
    `UserName` VARCHAR(256) NOT NULL,
    `Email` VARCHAR(256) NOT NULL,
    `Role` VARCHAR(256) NOT NULL DEFAULT 'User',
    `FirstName` VARCHAR(256) NOT NULL,
    `LastName` VARCHAR(256) NOT NULL,
    PRIMARY KEY (`Id`),
    UNIQUE KEY `UserNameIndex` (`UserName`),
    UNIQUE KEY `EmailIndex` (`Email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
"""