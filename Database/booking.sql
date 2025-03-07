-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 03, 2022 at 09:41 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `booking`
--
CREATE DATABASE IF NOT EXISTS `booking` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `booking`;

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

CREATE TABLE `followers` (
  `followerId` int(11) NOT NULL,
  `vacationId` int(11) NOT NULL,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `followers`
--

INSERT INTO `followers` (`followerId`, `vacationId`, `userId`) VALUES
(33, 4, 27),
(71, 3, 25),
(78, 3, 28),
(114, 5, 27),
(115, 3, 27),
(122, 10, 25),
(144, 5, 28),
(165, 5, 25),
(173, 19, 26),
(178, 18, 26),
(186, 19, 25),
(187, 17, 26),
(188, 3, 26);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `firstName` varchar(20) NOT NULL,
  `lastName` varchar(30) NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(128) NOT NULL,
  `role` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `firstName`, `lastName`, `username`, `password`, `role`) VALUES
(24, 'Tomer', 'Golan', 'tomergolan', 'cbcb2db6539e50ee06e0ea2d95e722074edef25ff9a6aac09e2cd80ed3e3bb7abb6369d94e280b14970c7bbf6af7362715db4909572a34c00fa407b5291918f3', 'Admin'),
(25, 'Bart', 'Simpson', 'bartsimpson', '38d93293c49fd167d29179580c34991226d527514fcbc5bdc2de2409e2ae975842aa797062db9b9ff1e892a4f0ed2e19d6bae1b2565526966420e50e8859d127', 'User'),
(26, 'Lisa', 'Simpson', 'lisasimpson', '917ad900d2cef6f1df739664d79b0140fe00f5384293861685085aca7124bfdfb8b8a5fe8378a52dd8d35405ecfdd6a4812a4f47c0bd603f8ff442e58da5efa1', 'User'),
(27, 'Homer', 'Simpson', 'homersimpson', '7354cf493f6b831b17b612bfd019bffc274718bbdd7a8cdb1cdac1f18a615fae776295261d03e5dada20ebed65269308839a2d824cf0ab4bf14a088332a94cba', 'User'),
(28, 'Kermit', 'The Frog', 'thefrog', '6edb15a6ae87eacc1fab703dc874e999d3daf16d62f6dad7de5c3045188b7a30446cf5c6952e7e191fce89670bf9e82fa576912843f8afd43b5a4bc6fb326d7d', 'User');

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `vacationId` int(11) NOT NULL,
  `location` varchar(50) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `fromDate` date NOT NULL,
  `untilDate` date NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `imageName` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`vacationId`, `location`, `description`, `fromDate`, `untilDate`, `price`, `imageName`) VALUES
(3, 'Queen of Sheba Eilat', 'Fun Eilat!\r\n', '2022-07-04', '2022-07-07', '1499.00', '8d25a072-74d4-41a4-97fc-828b9575e7a6.jpg'),
(4, 'Paris', 'Romantic vacation!', '2022-08-23', '2022-08-30', '699.00', 'c98bf46c-2221-47d9-acc6-d4ba4c0dcfe9.jpg'),
(5, 'Rome', 'The best Pizza & Pasta in the world! ', '2022-08-28', '2022-09-01', '999.00', '48f12cc2-ec80-44e9-a977-db2e0708be89.jpg'),
(10, 'The Dead Sea', 'The lowest place on earth!', '2022-08-25', '2022-08-27', '699.00', '1a170c00-7fc8-4a02-9c88-81530ae18cbb.jpg'),
(17, 'Barcelona', 'Beautiful city!', '2022-08-18', '2022-08-22', '1199.00', '2346c2b8-7dcd-4570-bf23-8c48b8927037.jpg'),
(18, 'New York', 'Come visit the Time Squre!', '2022-07-10', '2022-07-21', '2199.00', '7a06ac98-24b4-4ae4-8010-2c41f080fd87.jpg'),
(19, 'Hilton TLV', 'The nonstop city!', '2022-07-19', '2022-07-26', '1599.00', '60f39419-29cc-4592-bf61-e9796dd18067.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `followers`
--
ALTER TABLE `followers`
  ADD PRIMARY KEY (`followerId`,`vacationId`,`userId`),
  ADD UNIQUE KEY `vacationId` (`vacationId`,`userId`) USING BTREE,
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`vacationId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `followers`
--
ALTER TABLE `followers`
  MODIFY `followerId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=191;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `vacationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `followers`
--
ALTER TABLE `followers`
  ADD CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`vacationId`) REFERENCES `vacations` (`vacationId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
