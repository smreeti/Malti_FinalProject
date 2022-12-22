DROP DATABASE IF EXISTS malti_bookstore;

CREATE DATABASE malti_bookstore;

USE malti_bookstore;

DROP TABLE IF EXISTS  `employee`;

CREATE TABLE IF NOT EXISTS `employee` (
  `employeeID` INT NOT NULL AUTO_INCREMENT,
  `firstName` VARCHAR(50) NULL DEFAULT NULL,
  `lastName` VARCHAR(50) NULL DEFAULT NULL,
  `email` VARCHAR(100) NOT NULL,
  `phoneNumber` BIGINT NULL DEFAULT NULL,
  `username` VARCHAR(50) NULL DEFAULT NULL,
  `password` VARCHAR(100) NULL DEFAULT NULL,
  PRIMARY KEY (`employeeID`),
  UNIQUE INDEX `Email_UNIQUE` (`email` ASC))
ENGINE = InnoDB;

DROP TABLE IF EXISTS `bookCategory` ;
CREATE TABLE IF NOT EXISTS `bookCategory` (
  `bookCategoryId` INT NOT NULL AUTO_INCREMENT,
  `categoryName` VARCHAR(100) NULL DEFAULT NULL,
  PRIMARY KEY (`BookCategoryId`))
ENGINE = InnoDB;

DROP TABLE IF EXISTS `author` ;
CREATE TABLE IF NOT EXISTS `author` (
  `authorId` INT NOT NULL AUTO_INCREMENT,
  `firstName` VARCHAR(50) NULL DEFAULT NULL,
  `lastName` VARCHAR(50) NULL DEFAULT NULL,
  `website` VARCHAR(300) NULL DEFAULT NULL,
  PRIMARY KEY (`authorId`))
ENGINE = InnoDB;

DROP TABLE IF EXISTS `book` ;

CREATE TABLE IF NOT EXISTS `book` (
  `bookID` INT NOT NULL AUTO_INCREMENT,
  `ISBN` VARCHAR(45) NOT NULL,
   `name` VARCHAR(50) NULL DEFAULT NULL,
   `price` DOUBLE NULL DEFAULT 0,
  `bookCategoryID` INT NOT NULL,
  `authorId` INT NOT NULL,
   `image` VARCHAR(150) NULL DEFAULT NULL,
	PRIMARY KEY (`BookId`),
	FOREIGN KEY (bookCategoryID) REFERENCES `bookCategory`(bookCategoryId),
	FOREIGN KEY (authorId) REFERENCES `author`(authorId))
ENGINE = InnoDB;

DROP TABLE IF EXISTS  `orderStatus`;
CREATE TABLE IF NOT EXISTS `orderStatus` (
  `orderStatusID` INT NOT NULL AUTO_INCREMENT,
  `description` VARCHAR(100) NULL DEFAULT NULL,
  `code` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`orderStatusID`))
ENGINE = InnoDB;

DROP TABLE IF EXISTS  `bookOrder`;
CREATE TABLE IF NOT EXISTS `bookOrder` (
  `bookOrderID`  INT NOT NULL AUTO_INCREMENT,
  `orderNumber` VARCHAR(5) NOT NULL, 
  `quantity` INT NULL DEFAULT 0,
  `orderedDate` datetime DEFAULT NULL,
  `totalAmount` DOUBLE DEFAULT 0,
   `employeeID` INT NOT NULL,
   `orderStatusID` INT NOT NULL,
  PRIMARY KEY (`bookOrderID`),
  FOREIGN KEY (employeeID) REFERENCES `employee`(employeeID),
  FOREIGN KEY (orderStatusID) REFERENCES `orderStatus`(orderStatusID))
ENGINE = InnoDB;

DROP TABLE IF EXISTS  `orderItem`;

CREATE TABLE IF NOT EXISTS `orderItem` (
  `orderItemID`  INT NOT NULL AUTO_INCREMENT,
  `bookOrderID` INT NOT NULL,
  `quantity` INT NULL DEFAULT 0,
   `bookID` INT NOT NULL,
   `orderStatusID` INT NOT NULL,
  PRIMARY KEY (`orderItemID`),
  FOREIGN KEY (bookID) REFERENCES `book`(bookID),
  FOREIGN KEY (bookOrderID) REFERENCES `bookOrder`(bookOrderID),
  FOREIGN KEY (orderStatusID) REFERENCES `orderStatus`(orderStatusID))
ENGINE = InnoDB;

DROP TABLE IF EXISTS `bookStock`;
CREATE TABLE IF NOT EXISTS `bookStock` (
  `bookStockID`  INT NOT NULL AUTO_INCREMENT,
  `bookID` INT NOT NULL, 
  `quantity` INT NULL DEFAULT 0,
  PRIMARY KEY (`bookStockID`),
  FOREIGN KEY (bookID) REFERENCES `book`(bookID))
ENGINE = InnoDB;






