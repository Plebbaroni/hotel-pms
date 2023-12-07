-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 07, 2023 at 04:56 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hoteldb`
--

-- --------------------------------------------------------

--
-- Table structure for table `booking`
--

CREATE TABLE `booking` (
  `booking_id` int(11) NOT NULL,
  `room_number` int(11) NOT NULL,
  `number_of_guests_adult` int(11) NOT NULL,
  `number_of_guests_children` int(11) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `check_in_date` date NOT NULL,
  `check_out_date` date NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `country` varchar(45) NOT NULL DEFAULT 'Parts Unknown',
  `phone_number` varchar(45) NOT NULL DEFAULT '0000000',
  `email` varchar(45) NOT NULL DEFAULT 'generic_email',
  `check_in_confirmed` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `booking`
--

INSERT INTO `booking` (`booking_id`, `room_number`, `number_of_guests_adult`, `number_of_guests_children`, `first_name`, `last_name`, `check_in_date`, `check_out_date`, `user_id`, `created_at`, `is_active`, `country`, `phone_number`, `email`, `check_in_confirmed`) VALUES
(4, 312, 1, 2, 'john', 'cena', '2023-11-30', '2023-12-04', 13, '2023-11-30 11:05:16', 0, 'Parts Unknown', '0000000', 'generic_email', 0),
(7, 403, 2, 0, 'joe', 'jhala', '2023-12-10', '2023-12-18', 13, '2023-12-03 14:23:03', 1, 'Sweden', '132123', 'joemama@gmail.com', 0),
(8, 315, 1, 2, 'onyx', 'gilbert', '2023-12-04', '2023-12-06', 13, '2023-12-04 08:24:02', 1, 'CartiVille', '123123123', 'onyxgilbert@gmail.com', 0);

-- --------------------------------------------------------

--
-- Table structure for table `checkout_balance`
--

CREATE TABLE `checkout_balance` (
  `current_balance` float NOT NULL DEFAULT 0,
  `number_of_orders` int(11) NOT NULL DEFAULT 0,
  `tenant_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `employee_id` int(11) NOT NULL,
  `department` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `inventory_item`
--

CREATE TABLE `inventory_item` (
  `item_id` int(11) NOT NULL,
  `item_quantity` int(11) NOT NULL,
  `item_price` float NOT NULL,
  `item_name` varchar(50) NOT NULL,
  `is_perishable` tinyint(1) NOT NULL DEFAULT 0,
  `is_deleted` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `inventory_item`
--

INSERT INTO `inventory_item` (`item_id`, `item_quantity`, `item_price`, `item_name`, `is_perishable`, `is_deleted`) VALUES
(1, 10, 10, 'Shampoo', 0, 1),
(2, 4, 20, 'Soap', 1, 0),
(3, 50, 200, 'Water Bottle', 1, 0),
(4, 213, 123, 'Ditto bayot 3', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `inventory_order`
--

CREATE TABLE `inventory_order` (
  `transaction_id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  `item_quantity` int(11) NOT NULL,
  `item_price` float NOT NULL,
  `tenant_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `room`
--

CREATE TABLE `room` (
  `room_number` int(11) NOT NULL,
  `room_type` varchar(100) NOT NULL,
  `floor_number` int(11) NOT NULL,
  `room_status` enum('Vacant','Needs Maintenance','Occupied','Expected Arrival') NOT NULL DEFAULT 'Vacant',
  `is_deleted` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `room`
--

INSERT INTO `room` (`room_number`, `room_type`, `floor_number`, `room_status`, `is_deleted`) VALUES
(202, 'Deluxe Room', 4, 'Vacant', 1),
(305, 'Superior Room', 3, 'Vacant', 0),
(312, 'Deluxe Room', 3, 'Vacant', 0),
(313, 'Suite Room', 3, 'Vacant', 0),
(314, 'Deluxe Room', 3, 'Vacant', 1),
(315, 'Family Room', 3, 'Expected Arrival', 0),
(403, 'Deluxe Room', 4, 'Vacant', 0),
(404, 'Standard Room', 4, 'Vacant', 0),
(415, 'Family Room', 4, 'Vacant', 0),
(417, 'Family Room', 4, 'Vacant', 0),
(456, 'Family Room', 4, 'Vacant', 1),
(514, 'Family Room', 5, 'Vacant', 0);

-- --------------------------------------------------------

--
-- Table structure for table `room_type`
--

CREATE TABLE `room_type` (
  `room_type` varchar(50) NOT NULL,
  `room_rate` float DEFAULT NULL,
  `room_images` tinyblob DEFAULT NULL,
  `min_number_of_occupants` int(11) NOT NULL,
  `max_number_of_occupants` int(11) NOT NULL,
  `room_description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `room_type`
--

INSERT INTO `room_type` (`room_type`, `room_rate`, `room_images`, `min_number_of_occupants`, `max_number_of_occupants`, `room_description`) VALUES
('Deluxe Room', 2400, NULL, 1, 2, 'test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test'),
('Family Room', 2800, NULL, 2, 4, NULL),
('Standard Room', 1500, NULL, 1, 1, NULL),
('Suite Room', 2800, NULL, 1, 3, NULL),
('Superior Room', 2000, NULL, 1, 2, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tenant`
--

CREATE TABLE `tenant` (
  `tenant_id` int(11) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `additional_details` text DEFAULT NULL,
  `booking_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `tenant`
--

INSERT INTO `tenant` (`tenant_id`, `first_name`, `last_name`, `additional_details`, `booking_id`) VALUES
(11, 'onyx', 'gilbert', NULL, 8);

-- --------------------------------------------------------

--
-- Table structure for table `user_account`
--

CREATE TABLE `user_account` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(200) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `phone_number` varchar(15) NOT NULL,
  `email` varchar(50) NOT NULL,
  `role` enum('Employee','Customer','Admin') NOT NULL DEFAULT 'Customer',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `user_account`
--

INSERT INTO `user_account` (`id`, `username`, `password`, `first_name`, `last_name`, `phone_number`, `email`, `role`, `created_at`, `is_deleted`) VALUES
(1, 'joemama', '$2b$10$RX/6cWdt8lMO1LEvXCNCpeuLU8CsoO8lLC.H1RLTA4gjJthvNEZ0e', 'joe', 'mama', '8008153', 'joemama@gmail.com', 'Customer', '2023-11-13 03:49:25', 1),
(2, 'onyxgilbert', '$2b$10$Cnb2G7wX7Sh6BdlLTqNUK.Idp9tUaXMLi0UKEkFWTja8brwJbRJ9q', 'joe', 'gilbert', '123123123', 'onyxgilbert@gmail.com', 'Employee', '2023-11-13 03:58:36', 0),
(3, 'jimmy', '$2b$10$KAYTd7up2hXptJR.IT9jwup.FCCn6/WrVkQOmMmNnyn/g3l77McGi', 'jimmy', 'jim', '123123', 'ji@jim.com', 'Customer', '2023-11-13 04:17:39', 0),
(4, 'gelato', '$2b$10$ADwR4Q58rJ2jvGpKEth87Oo/ZHINmUR0PsX8TFJ0JfIzLcl/Pi4E2', 'angelo', 'pumar', '1231231233', 'jpumar@joemama.com', 'Customer', '2023-11-13 06:13:07', 0),
(5, 'aa', '$2b$10$kDJuxMzvnoFi0z0PZHyyj.RJbR6RVDYegz0uGiPF1lf2m.e/1vQcS', 'aa', 'aa', '123123', 'aa@aa.com', 'Employee', '2023-11-13 06:55:46', 0),
(6, 'seanduran', '$2b$10$CTn9HOkgiK9ywwXSYASAZO9KoPkON93wt/ZR665ecvPVQHn/W4Voq', 'sean', 'duran', '92813', 'seanduran@gmail.com', 'Customer', '2023-11-16 04:46:38', 1),
(7, 'bb', '$2b$10$6YJ50W4b/A09bqWvETHmj.QQpgK1axVVunTXfEXyA0XTUvuzf/IBq', 'bb', 'bb', '123123', 'bb', 'Admin', '2023-11-18 12:40:42', 0),
(8, 'cc', '$2b$10$ISDesLOg/2QU.EKMZrpAlO43kWF.2e8cYfX2XVpgKLRCBJuDEHDzO', 'cc', 'cc', '341441341', 'cc2cc.com', 'Customer', '2023-11-23 00:35:18', 1),
(9, 'dd', '$2b$10$qLu4ImGUMPnziVtHEMfiCuvdiw2M7607a4CeZNDg5yfzrSHnrWAZS', 'dd', 'dd', '123123', 'dd@dd.com', 'Customer', '2023-11-25 13:54:14', 1),
(10, 'dd', '$2b$10$YteDYzXSZhAWlgaY.KuLQ.Bi.RGqhC97lfjT5nNPziKbD6Eh3fei.', 'dd', 'dd', '123', 'dd@dd.com', 'Customer', '2023-11-25 14:20:46', 0),
(11, 'bobert', '$2b$10$B62Fpv5r343pj1ZbDwRIeuAZ6YqdCqiWCH5OsGFJnngtgPJZu0KXu', 'bob', 'robert', '123241', 'bob@robert.com', 'Customer', '2023-11-27 12:51:36', 0),
(12, '', '$2b$10$bVkI0YqFrQNeLgwdAmdevuoBYy56S6TtHiZUlbkdao0/6UdPoshRK', '', '', '', '', 'Customer', '2023-11-27 12:54:10', 1),
(13, 'customer', '$2b$10$vVK/SWL7KhM/yg5ejHWa0OMOn.1vkdirx9ro9rv1AqN2HHNsjS4zu', 'cust', 'omer', '123123123', 'customer@gmail.com', 'Customer', '2023-11-28 03:37:04', 0),
(14, 'd', '$2b$10$EYwWw9rfn9Vh2ejujh7vp.VgnZsqkH3bj1CWLDY.QolV86GLC2jJW', '', '', '', '', 'Customer', '2023-11-28 04:02:03', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`booking_id`),
  ADD KEY `fk_booking_room_type` (`room_number`),
  ADD KEY `fk_booking_customer` (`user_id`);

--
-- Indexes for table `checkout_balance`
--
ALTER TABLE `checkout_balance`
  ADD KEY `fk_checkout_balance_tenant` (`tenant_id`);

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`employee_id`);

--
-- Indexes for table `inventory_item`
--
ALTER TABLE `inventory_item`
  ADD PRIMARY KEY (`item_id`);

--
-- Indexes for table `inventory_order`
--
ALTER TABLE `inventory_order`
  ADD PRIMARY KEY (`transaction_id`),
  ADD KEY `fk_inventorder_item` (`item_id`),
  ADD KEY `fk_tenant_order` (`tenant_id`);

--
-- Indexes for table `room`
--
ALTER TABLE `room`
  ADD PRIMARY KEY (`room_number`),
  ADD KEY `fk_room_room_type` (`room_type`);

--
-- Indexes for table `room_type`
--
ALTER TABLE `room_type`
  ADD PRIMARY KEY (`room_type`);

--
-- Indexes for table `tenant`
--
ALTER TABLE `tenant`
  ADD PRIMARY KEY (`tenant_id`),
  ADD KEY `fk_tenant_booking` (`booking_id`);

--
-- Indexes for table `user_account`
--
ALTER TABLE `user_account`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `booking`
--
ALTER TABLE `booking`
  MODIFY `booking_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `employee_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `inventory_item`
--
ALTER TABLE `inventory_item`
  MODIFY `item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `inventory_order`
--
ALTER TABLE `inventory_order`
  MODIFY `transaction_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `room`
--
ALTER TABLE `room`
  MODIFY `room_number` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=515;

--
-- AUTO_INCREMENT for table `tenant`
--
ALTER TABLE `tenant`
  MODIFY `tenant_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `user_account`
--
ALTER TABLE `user_account`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `booking`
--
ALTER TABLE `booking`
  ADD CONSTRAINT `fk_booking_room_type` FOREIGN KEY (`room_number`) REFERENCES `room` (`room_number`),
  ADD CONSTRAINT `fk_booking_user` FOREIGN KEY (`user_id`) REFERENCES `user_account` (`id`);

--
-- Constraints for table `checkout_balance`
--
ALTER TABLE `checkout_balance`
  ADD CONSTRAINT `fk_checkout_balance_tenant` FOREIGN KEY (`tenant_id`) REFERENCES `tenant` (`tenant_id`);

--
-- Constraints for table `employee`
--
ALTER TABLE `employee`
  ADD CONSTRAINT `fk_employee_acc` FOREIGN KEY (`employee_id`) REFERENCES `user_account` (`id`);

--
-- Constraints for table `inventory_order`
--
ALTER TABLE `inventory_order`
  ADD CONSTRAINT `fk_inventorder_item` FOREIGN KEY (`item_id`) REFERENCES `inventory_item` (`item_id`),
  ADD CONSTRAINT `fk_tenant_order` FOREIGN KEY (`tenant_id`) REFERENCES `tenant` (`tenant_id`);

--
-- Constraints for table `room`
--
ALTER TABLE `room`
  ADD CONSTRAINT `fk_room_room_type` FOREIGN KEY (`room_type`) REFERENCES `room_type` (`room_type`);

--
-- Constraints for table `tenant`
--
ALTER TABLE `tenant`
  ADD CONSTRAINT `fk_tenant_booking` FOREIGN KEY (`booking_id`) REFERENCES `booking` (`booking_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
