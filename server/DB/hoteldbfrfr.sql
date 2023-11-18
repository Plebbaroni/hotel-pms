-- MySQL dump 10.13  Distrib 8.0.34, for macos13 (arm64)
--
-- Host: 127.0.0.1    Database: hoteldb
-- ------------------------------------------------------
-- Server version	8.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Booking`
--

CREATE TABLE `Booking` (
  `booking_id` int NOT NULL AUTO_INCREMENT,
  `room_number` int NOT NULL,
  `number_of_guests_adult` int NOT NULL,
  `number_of_guests_children` int NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `check_in_date` date NOT NULL,
  `check_out_date` date NOT NULL,
  `customer_id` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`booking_id`),
  KEY `fk_booking_room_type` (`room_number`),
  KEY `fk_booking_customer` (`customer_id`),
  CONSTRAINT `fk_booking_customer` FOREIGN KEY (`customer_id`) REFERENCES `Customer` (`customer_id`),
  CONSTRAINT `fk_booking_room_type` FOREIGN KEY (`room_number`) REFERENCES `Room` (`room_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Booking`
--


CREATE TABLE `Checkout_Balance` (
  `current_balance` float NOT NULL,
  `number_of_orders` int NOT NULL,
  PRIMARY KEY (`current_balance`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Customer` (
  `customer_id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`customer_id`),
  CONSTRAINT `fk_customer_acc` FOREIGN KEY (`customer_id`) REFERENCES `User_Account` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Customer`
--

CREATE TABLE `Employee` (
  `employee_id` int NOT NULL AUTO_INCREMENT,
  `department` varchar(50) NOT NULL,
  PRIMARY KEY (`employee_id`),
  CONSTRAINT `fk_employee_acc` FOREIGN KEY (`employee_id`) REFERENCES `User_Account` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

CREATE TABLE `Inventory_Item` (
  `item_id` int NOT NULL AUTO_INCREMENT,
  `item_quantity` int NOT NULL,
  `item_price` float NOT NULL,
  `item_name` varchar(50) NOT NULL,
  `is_perishable` tinyint(1) NOT NULL,
  PRIMARY KEY (`item_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

CREATE TABLE `Inventory_Order` (
  `transaction_id` int NOT NULL AUTO_INCREMENT,
  `item_id` int NOT NULL,
  `room_number` int NOT NULL,
  `item_quantity` int NOT NULL,
  `item_price` float NOT NULL,
  `tenant_id` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`transaction_id`),
  KEY `fk_inventorder_room` (`room_number`),
  KEY `fk_inventorder_item` (`item_id`),
  KEY `fk_tenant_order` (`tenant_id`),
  CONSTRAINT `fk_inventorder_item` FOREIGN KEY (`item_id`) REFERENCES `Inventory_Item` (`item_id`),
  CONSTRAINT `fk_inventorder_room` FOREIGN KEY (`room_number`) REFERENCES `Room` (`room_number`),
  CONSTRAINT `fk_tenant_order` FOREIGN KEY (`tenant_id`) REFERENCES `Tenant` (`tenant_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Room` (
  `room_number` int NOT NULL AUTO_INCREMENT,
  `room_type` varchar(100) NOT NULL,
  `floor_number` int NOT NULL,
  `room_status` enum('Vacant','Needs Maintenance','Occupied','Expected Arrival') NOT NULL DEFAULT 'Vacant',
  PRIMARY KEY (`room_number`),
  KEY `fk_room_room_type` (`room_type`),
  CONSTRAINT `fk_room_room_type` FOREIGN KEY (`room_type`) REFERENCES `Room_Type` (`room_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Room_Type` (
  `room_type` varchar(50) NOT NULL,
  `room_rate` float DEFAULT NULL,
  `room_images` tinyblob,
  `min_number_of_occupants` int NOT NULL,
  `max_number_of_occupants` int NOT NULL,
  `room_description` text,
  PRIMARY KEY (`room_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Room_Type`
--


INSERT INTO `Room_Type` VALUES ('Deluxe Room',2400,NULL,1,2,'test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test'),('Family Room',2800,NULL,2,4,NULL),('Standard Room',1500,NULL,1,1,NULL),('Suite Room',2800,NULL,1,3,NULL),('Superior Room',2000,NULL,1,2,NULL);

CREATE TABLE `Tenant` (
  `tenant_id` int NOT NULL AUTO_INCREMENT,
  `current_balance` float NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `booking_id` int NOT NULL,
  `additional_details` text,
  PRIMARY KEY (`tenant_id`),
  KEY `fk_tenant_balance` (`current_balance`),
  KEY `fk_tenant_booking` (`booking_id`),
  CONSTRAINT `fk_tenant_balance` FOREIGN KEY (`current_balance`) REFERENCES `Checkout_Balance` (`current_balance`),
  CONSTRAINT `fk_tenant_booking` FOREIGN KEY (`booking_id`) REFERENCES `Booking` (`booking_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

CREATE TABLE `User_Account` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(200) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `phone_number` int NOT NULL,
  `email` varchar(50) NOT NULL,
  `role` enum('Employee','Customer','Admin') NOT NULL DEFAULT 'Customer',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `User_Account` VALUES (1,'joemama','$2b$10$RX/6cWdt8lMO1LEvXCNCpeuLU8CsoO8lLC.H1RLTA4gjJthvNEZ0e','joe','mama',8008153,'joemama@gmail.com','Customer','2023-11-13 03:49:25'),(2,'onyxgilbert','$2b$10$Cnb2G7wX7Sh6BdlLTqNUK.Idp9tUaXMLi0UKEkFWTja8brwJbRJ9q','onyx','gilbert',123123123,'onyxgilbert@gmail.com','Customer','2023-11-13 03:58:36'),(3,'jimmy','$2b$10$KAYTd7up2hXptJR.IT9jwup.FCCn6/WrVkQOmMmNnyn/g3l77McGi','jimmy','jim',123123,'ji@jim.com','Customer','2023-11-13 04:17:39'),(4,'gelo','$2b$10$ADwR4Q58rJ2jvGpKEth87Oo/ZHINmUR0PsX8TFJ0JfIzLcl/Pi4E2','angelo','pumar',1231231233,'jpumar@joemama.com','Customer','2023-11-13 06:13:07'),(5,'aa','$2b$10$kDJuxMzvnoFi0z0PZHyyj.RJbR6RVDYegz0uGiPF1lf2m.e/1vQcS','aa','aa',123123,'aa@aa.com','Employee','2023-11-13 06:55:46'),(6,'seanduran','$2b$10$CTn9HOkgiK9ywwXSYASAZO9KoPkON93wt/ZR665ecvPVQHn/W4Voq','sean','duran',92813,'seanduran@gmail.com','Customer','2023-11-16 04:46:38');

