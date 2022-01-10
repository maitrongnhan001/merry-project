-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 10, 2022 at 03:49 AM
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

-- --------------------------------------------------------

--
-- Table structure for table `friend`
--

CREATE TABLE `friend` (
  `sendId` int(11) NOT NULL,
  `receiveId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

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

-- --------------------------------------------------------

--
-- Table structure for table `mediamessage`
--

CREATE TABLE `mediamessage` (
  `id` int(11) NOT NULL,
  `path` varchar(255) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `messageId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

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

-- --------------------------------------------------------

--
-- Table structure for table `textmessage`
--

CREATE TABLE `textmessage` (
  `id` int(11) NOT NULL,
  `content` text COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `messageId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

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

-- --------------------------------------------------------

--
-- Table structure for table `waitingresquest`
--

CREATE TABLE `waitingresquest` (
  `sendId` int(11) NOT NULL,
  `receiveId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `message`
--
ALTER TABLE `message`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `textmessage`
--
ALTER TABLE `textmessage`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

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
