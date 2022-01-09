-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 09, 2022 at 11:02 AM
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
-- Indexes for dumped tables
--

--
-- Indexes for table `detailgroup`
--
ALTER TABLE `detailgroup`
  ADD PRIMARY KEY (`groupId`,`userId`),
  ADD KEY `fk_user_detailGroup` (`userId`);

--
-- Indexes for table `groupuser`
--
ALTER TABLE `groupuser`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `detailgroup`
--
ALTER TABLE `detailgroup`
  ADD CONSTRAINT `fk_group_detailGroup` FOREIGN KEY (`groupId`) REFERENCES `groupuser` (`id`),
  ADD CONSTRAINT `fk_user_detailGroup` FOREIGN KEY (`userId`) REFERENCES `user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
