-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 16, 2022 at 10:57 AM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.12

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
('G1', 1),
('G1', 2),
('G1', 3),
('G2', 1),
('G2', 2),
('G3', 1),
('G3', 3);

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
(1, 2),
(1, 3),
(3, 2);

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
('G1', 'Niên luận ngành kỹ thuật phần mềm', 1, 'image.png'),
('G2', 'Nhóm học code ReactJS', 2, 'image1.png'),
('G3', 'Nhóm học NodeJS', 3, 'image3.png');

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
(1, 'image.png', 1),
(2, 'image1.png', 2),
(3, 'image3.png', 3);

-- --------------------------------------------------------

--
-- Table structure for table `message`
--

CREATE TABLE `message` (
  `id` int(11) NOT NULL,
  `time` time NOT NULL DEFAULT current_timestamp(),
  `emotion` varchar(128) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `sendId` int(11) NOT NULL,
  `receiveId` varchar(128) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `status` varchar(64) COLLATE utf8mb4_vietnamese_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Dumping data for table `message`
--

INSERT INTO `message` (`id`, `time`, `emotion`, `sendId`, `receiveId`, `status`) VALUES
(1, '03:23:22', ':V', 1, 'G1', 'send'),
(2, '07:40:32', ':)', 2, 'G2', 'send'),
(3, '20:30:15', ':(', 3, 'G3', 'send');

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
(1, 'Chào mọi người', 1),
(2, 'Tới giờ học rồi', 2),
(3, 'Lên học nodejs nè', 3);

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
  `image` varchar(255) COLLATE utf8mb4_vietnamese_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `email`, `password`, `DOB`, `firstName`, `lastName`, `sex`, `image`) VALUES
(1, 'viettrung0601@gmail.com', '$2b$10$/sK2u1.MdoAQjO9VUGkvI.Jbjckdji8psMspu4KYXq6lkGKVxsMOW', '2000-01-06', 'Trung', 'Trần Việt', 0, 'image.png'),
(2, 'khangb1805870@student.ctu.edu.vn', '$2b$10$/sK2u1.MdoAQjO9VUGkvI.Jbjckdji8psMspu4KYXq6lkGKVxsMOW', '2000-06-08', 'Khang', 'Đinh Phúc', 0, 'image1.png'),
(3, 'nhanb1805899@student.ctu.edu.vn', '$2b$10$/sK2u1.MdoAQjO9VUGkvI.Jbjckdji8psMspu4KYXq6lkGKVxsMOW', '2022-01-01', 'Nhân', 'Mai Trọng', 0, 'image2.png');

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
(1, 3);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `message`
--
ALTER TABLE `message`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `textmessage`
--
ALTER TABLE `textmessage`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

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
