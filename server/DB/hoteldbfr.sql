
CREATE TABLE `Checkout_Balance` (
  `current_balance` float PRIMARY KEY NOT NULL,
  `number_of_orders` int NOT NULL
);

CREATE TABLE `Customer` (
  `customer_id` int PRIMARY KEY NOT NULL AUTO_INCREMENT
);

CREATE TABLE `Employee` (
  `employee_id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `department` varchar(50) NOT NULL
);

CREATE TABLE `Inventory_Item` (
  `item_id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `item_quantity` int NOT NULL,
  `item_price` float NOT NULL,
  `item_name` varchar(50) NOT NULL,
  `is_perishable` tinyint(1) NOT NULL
);

CREATE TABLE `Inventory_Order` (
  `transaction_id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `item_id` int NOT NULL,
  `room_number` int NOT NULL,
  `item_quantity` int NOT NULL,
  `item_price` float NOT NULL,
  `tenant_id` int NOT NULL,
  `created_at` timestamp NOT NULL
);

CREATE TABLE `Room` (
  `room_number` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `room_type` varchar(100) NOT NULL,
  `floor_number` int NOT NULL,
  `room_status` ENUM ('Vacant', 'Needs Maintenance', 'Occupied', 'Expected Arrival') NOT NULL DEFAULT "Vacant"
);

CREATE TABLE `Room_Type` (
  `room_type` varchar(50) PRIMARY KEY NOT NULL,
  `room_rate` float DEFAULT NULL,
  `room_images` tinyblob,
  `min_number_of_occupants_adults` int NOT NULL,
  `min_number_of_occupants_children` int NOT NULL,
  `max_number_of_occupants_adults` int NOT NULL,
  `max_number_of_occupants_children` int NOT NULL,
  `room_description` text
);

CREATE TABLE `Booking` (
  `booking_id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `room_number` int NOT NULL,
  `number_of_guests_adult` int NOT NULL,
  `number_of_guests_children` int NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `check_in_date` date NOT NULL,
  `check_out_date` date NOT NULL,
  `customer_id` int NOT NULL,
  `created_at` timestamp NOT NULL
);

CREATE TABLE `Tenant` (
  `tenant_id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `current_balance` float NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `booking_id` int NOT NULL,
  `additional_details` text
);

CREATE TABLE `User_Account` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(20) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `phone_number` int NOT NULL,
  `email` varchar(50) NOT NULL,
  `role` ENUM ('Employee', 'Customer', 'Admin') NOT NULL DEFAULT "Customer",
  `created_at` timestamp NOT NULL
);

CREATE INDEX `fk_booking_room_type` ON `Booking` (`room_number`);

CREATE INDEX `fk_booking_customer` ON `Booking` (`customer_id`);

CREATE INDEX `fk_inventorder_room` ON `Inventory_Order` (`room_number`);

CREATE INDEX `fk_inventorder_item` ON `Inventory_Order` (`item_id`);

CREATE INDEX `fk_tenant_order` ON `Inventory_Order` (`tenant_id`);

CREATE INDEX `fk_room_room_type` ON `Room` (`room_type`);

CREATE INDEX `fk_tenant_balance` ON `Tenant` (`current_balance`);

CREATE INDEX `fk_tenant_booking` ON `Tenant` (`booking_id`);

ALTER TABLE `Booking` ADD CONSTRAINT `fk_booking_customer` FOREIGN KEY (`customer_id`) REFERENCES `Customer` (`customer_id`);

ALTER TABLE `Booking` ADD CONSTRAINT `fk_booking_room_type` FOREIGN KEY (`room_number`) REFERENCES `Room` (`room_number`);

ALTER TABLE `Customer` ADD CONSTRAINT `fk_customer_acc` FOREIGN KEY (`customer_id`) REFERENCES `User_Account` (`id`);

ALTER TABLE `Employee` ADD CONSTRAINT `fk_employee_acc` FOREIGN KEY (`employee_id`) REFERENCES `User_Account` (`id`);

ALTER TABLE `Inventory_Order` ADD CONSTRAINT `fk_inventorder_item` FOREIGN KEY (`item_id`) REFERENCES `Inventory_Item` (`item_id`);

ALTER TABLE `Inventory_Order` ADD CONSTRAINT `fk_inventorder_room` FOREIGN KEY (`room_number`) REFERENCES `Room` (`room_number`);

ALTER TABLE `Inventory_Order` ADD CONSTRAINT `fk_tenant_order` FOREIGN KEY (`tenant_id`) REFERENCES `Tenant` (`tenant_id`);

ALTER TABLE `Room` ADD CONSTRAINT `fk_room_room_type` FOREIGN KEY (`room_type`) REFERENCES `Room_Type` (`room_type`);

ALTER TABLE `Tenant` ADD CONSTRAINT `fk_tenant_balance` FOREIGN KEY (`current_balance`) REFERENCES `Checkout_Balance` (`current_balance`);

ALTER TABLE `Tenant` ADD CONSTRAINT `fk_tenant_booking` FOREIGN KEY (`booking_id`) REFERENCES `Booking` (`booking_id`);
