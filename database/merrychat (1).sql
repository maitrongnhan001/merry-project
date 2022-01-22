-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jan 21, 2022 at 12:55 PM
-- Server version: 10.4.20-MariaDB
-- PHP Version: 8.0.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `merrychat`
--
CREATE DATABASE IF NOT EXISTS `merrychat` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `merrychat`;

-- --------------------------------------------------------

--
-- Table structure for table `detailgroup`
--

CREATE TABLE `detailgroup` (
  `groupId` varchar(128) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Dumping data for table `detailgroup`
--

INSERT INTO `detailgroup` (`groupId`, `userId`) VALUES
('G0005', 1),
('G0005', 2),
('G0005', 3),
('G0005', 4),
('G0005', 5),
('U0001', 1),
('U0001', 2),
('U0002', 1),
('U0002', 3),
('U0003', 1),
('U0003', 4),
('U0004', 1),
('U0004', 5);

-- --------------------------------------------------------

--
-- Table structure for table `friend`
--

CREATE TABLE `friend` (
  `sendId` int(11) NOT NULL,
  `receiveId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Dumping data for table `friend`
--

INSERT INTO `friend` (`sendId`, `receiveId`) VALUES
(1, 3),
(4, 5);

-- --------------------------------------------------------

--
-- Table structure for table `groupuser`
--

CREATE TABLE `groupuser` (
  `id` varchar(128) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `groupName` varchar(64) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `AdminId` int(11) DEFAULT NULL,
  `image` varchar(255) COLLATE utf8mb4_vietnamese_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Dumping data for table `groupuser`
--

INSERT INTO `groupuser` (`id`, `groupName`, `AdminId`, `image`) VALUES
('G0005', 'Tối nay ăn gì??', 1, 'avatar-group-1'),
('U0001', '', NULL, NULL),
('U0002', '', NULL, NULL),
('U0003', '', NULL, NULL),
('U0004', '', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `mediamessage`
--

CREATE TABLE `mediamessage` (
  `id` int(11) NOT NULL,
  `path` varchar(255) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `messageId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Dumping data for table `mediamessage`
--

INSERT INTO `mediamessage` (`id`, `path`, `messageId`) VALUES
(1, 'message-image-1.jpeg', 9),
(2, 'message-document-1.doc', 10);

-- --------------------------------------------------------

--
-- Table structure for table `message`
--

CREATE TABLE `message` (
  `id` int(11) NOT NULL,
  `time` datetime NOT NULL DEFAULT current_timestamp(),
  `emotion` varchar(128) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `sendId` int(11) NOT NULL,
  `receiveId` varchar(128) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `status` varchar(64) COLLATE utf8mb4_vietnamese_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Dumping data for table `message`
--

INSERT INTO `message` (`id`, `time`, `emotion`, `sendId`, `receiveId`, `status`) VALUES
(1, '2022-01-21 19:30:10', '', 1, 'U0001', 'Đã xem'),
(2, '2022-01-21 19:30:11', '', 2, 'U0001', 'Đã xem'),
(3, '2022-01-21 19:30:12', '', 1, 'U0001', 'Đã xem'),
(4, '2022-01-21 19:30:13', '', 1, 'U0001', 'Đã xem'),
(5, '2022-01-21 19:30:14', '', 2, 'U0001', 'Đã nhận'),
(6, '2022-01-21 19:30:15', '', 1, 'G0005', 'Đã xem'),
(7, '2022-01-21 19:30:16', '', 2, 'G0005', 'Đã xem'),
(8, '2022-01-21 19:30:17', '', 3, 'G0005', 'Đã xem'),
(9, '2022-01-21 19:30:18', '', 4, 'G0005', 'Đã xem'),
(10, '2022-01-21 19:30:19', '', 5, 'G0005', 'Đã nhận');

-- --------------------------------------------------------

--
-- Table structure for table `textmessage`
--

CREATE TABLE `textmessage` (
  `id` int(11) NOT NULL,
  `content` text COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `messageId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Dumping data for table `textmessage`
--

INSERT INTO `textmessage` (`id`, `content`, `messageId`) VALUES
(1, 'Hello, đi câu cá không, ra chỗ tao nè, bao êm luôn', 1),
(2, 'Oke, tao cũng đang chán, mà đi mấy giờ m, qua chở tao được không, làm biếng chạy xe quá', 2),
(3, 'OK, 12h tao chạy qua', 3),
(4, '12h đêm', 4),
(5, 'đù, tới công chuyện', 5),
(6, 'Hello', 6),
(7, 'lô lô gì, quen biết gì không mà lô', 7),
(8, 'what, đây là đâu?? tao là ai????', 8);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `email` varchar(128) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `DOB` date DEFAULT NULL,
  `firstName` varchar(16) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `lastName` varchar(16) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `sex` tinyint(4) NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `template` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `email`, `password`, `DOB`, `firstName`, `lastName`, `sex`, `image`, `template`) VALUES
(1, 'nguyenvanan@gmail.com', 'an@12345', '2000-02-12', 'An', 'Nguyển Văn', 0, 'avatar-1.jpeg', 0),
(2, 'phanvantung@gmail.com', 'tung@12345', '1999-03-11', 'Tùng', 'Phan Văn', 0, 'avatar-2.jpeg', 0),
(3, 'lethuyduong@gmail.com', 'duong@12345', '2000-05-09', 'Dương', 'Lê Thuỳ', 1, 'avatar-3.jpeg', 0),
(4, 'nguyenleanhtu@gmail.com', 'tu@12345', '2000-11-20', 'Tú', 'Nguyễn Lê Anh', 0, 'avatar-4.jpeg', 0),
(5, 'tranhuyentrang@gmail.com', 'trang@12345', '2001-10-20', 'Trang', 'Trần Huyền', 0, 'avatar-5.jpeg', 0);

-- --------------------------------------------------------

--
-- Table structure for table `waitingresquest`
--

CREATE TABLE `waitingresquest` (
  `sendId` int(11) NOT NULL,
  `receiveId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Dumping data for table `waitingresquest`
--

INSERT INTO `waitingresquest` (`sendId`, `receiveId`) VALUES
(1, 2),
(2, 4);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `detailgroup`
--
ALTER TABLE `detailgroup`
  ADD PRIMARY KEY (`groupId`,`userId`),
  ADD KEY `fk_user_detailGroup` (`userId`);

--
-- Indexes for table `friend`
--
ALTER TABLE `friend`
  ADD KEY `sendId` (`sendId`),
  ADD KEY `receiveId` (`receiveId`);

--
-- Indexes for table `groupuser`
--
ALTER TABLE `groupuser`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mediamessage`
--
ALTER TABLE `mediamessage`
  ADD PRIMARY KEY (`id`),
  ADD KEY `messageId` (`messageId`);

--
-- Indexes for table `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`id`),
  ADD KEY `receiveId` (`receiveId`),
  ADD KEY `sendId` (`sendId`);

--
-- Indexes for table `textmessage`
--
ALTER TABLE `textmessage`
  ADD PRIMARY KEY (`id`),
  ADD KEY `messageId` (`messageId`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `waitingresquest`
--
ALTER TABLE `waitingresquest`
  ADD KEY `sendId` (`sendId`),
  ADD KEY `receiveId` (`receiveId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `mediamessage`
--
ALTER TABLE `mediamessage`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `message`
--
ALTER TABLE `message`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `textmessage`
--
ALTER TABLE `textmessage`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `detailgroup`
--
ALTER TABLE `detailgroup`
  ADD CONSTRAINT `fk_group_detailGroup` FOREIGN KEY (`groupId`) REFERENCES `groupuser` (`id`),
  ADD CONSTRAINT `fk_user_detailGroup` FOREIGN KEY (`userId`) REFERENCES `user` (`id`);

--
-- Constraints for table `friend`
--
ALTER TABLE `friend`
  ADD CONSTRAINT `friend_ibfk_1` FOREIGN KEY (`sendId`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `friend_ibfk_2` FOREIGN KEY (`receiveId`) REFERENCES `user` (`id`);

--
-- Constraints for table `mediamessage`
--
ALTER TABLE `mediamessage`
  ADD CONSTRAINT `mediamessage_ibfk_1` FOREIGN KEY (`messageId`) REFERENCES `message` (`id`);

--
-- Constraints for table `message`
--
ALTER TABLE `message`
  ADD CONSTRAINT `message_ibfk_1` FOREIGN KEY (`receiveId`) REFERENCES `groupuser` (`id`),
  ADD CONSTRAINT `message_ibfk_2` FOREIGN KEY (`sendId`) REFERENCES `user` (`id`);

--
-- Constraints for table `textmessage`
--
ALTER TABLE `textmessage`
  ADD CONSTRAINT `textmessage_ibfk_1` FOREIGN KEY (`messageId`) REFERENCES `message` (`id`);

--
-- Constraints for table `waitingresquest`
--
ALTER TABLE `waitingresquest`
  ADD CONSTRAINT `waitingresquest_ibfk_1` FOREIGN KEY (`sendId`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `waitingresquest_ibfk_2` FOREIGN KEY (`receiveId`) REFERENCES `user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
