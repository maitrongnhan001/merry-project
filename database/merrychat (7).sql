-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Feb 25, 2022 at 02:50 AM
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
('G1643357633810', 1),
('G1643357633810', 2),
('G1643357633810', 3),
('G1643357633810', 4),
('U0001', 1),
('U0001', 2),
('U0002', 1),
('U0002', 3),
('U0003', 1),
('U0003', 4),
('U0004', 1),
('U1643188466232', 2),
('U1643188466232', 3);

-- --------------------------------------------------------

--
-- Table structure for table `emotion`
--

CREATE TABLE `emotion` (
  `sendId` int(11) NOT NULL,
  `messageId` int(11) NOT NULL,
  `emotion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

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
(4, 5),
(5, 1);

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
('G0005', 'T???i nay ??n g????', 1, 'avatar-group-1'),
('G1643357633810', '', 1, 'group-1643374842290.jpg'),
('U0001', '', NULL, NULL),
('U0002', '', NULL, NULL),
('U0003', '', NULL, NULL),
('U0004', '', NULL, NULL),
('U1643188466232', '', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `message`
--

CREATE TABLE `message` (
  `id` int(11) NOT NULL,
  `time` time NOT NULL DEFAULT current_timestamp(),
  `sendId` int(11) NOT NULL,
  `receiveId` varchar(128) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `status` varchar(64) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `type` varchar(16) COLLATE utf8mb4_vietnamese_ci NOT NULL DEFAULT 'text',
  `content` text COLLATE utf8mb4_vietnamese_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Dumping data for table `message`
--

INSERT INTO `message` (`id`, `time`, `sendId`, `receiveId`, `status`, `type`, `content`) VALUES
(1, '19:30:10', 1, 'U0001', '???? xem', 'text', 'Hello, ??i c??u c?? kh??ng, ra ch??? tao n??, bao ??m lu??n'),
(2, '19:31:10', 2, 'U0001', '???? xem', 'text', 'Oke, tao c??ng ??ang ch??n, m?? ??i m???y gi??? m, qua ch??? tao ???????c kh??ng, l??m bi???ng ch???y xe qu??'),
(3, '19:32:10', 1, 'U0001', '???? xem', 'text', 'OK, 12h tao ch???y qua'),
(4, '19:32:10', 1, 'U0001', '???? xem', 'text', '12h ????m'),
(5, '19:33:10', 2, 'U0001', '???? nh???n', 'text', '????, t???i c??ng chuy???n'),
(6, '19:31:10', 1, 'G0005', '???? xem', 'text', 'Hello'),
(7, '19:31:10', 2, 'G0005', '???? xem', 'text', 'l?? l?? g??, quen bi???t g?? kh??ng m?? l??'),
(8, '19:32:10', 3, 'G0005', '???? xem', 'text', 'what, ????y l?? ????u?? tao l?? ai????'),
(9, '19:32:10', 4, 'G0005', '???? xem', 'media', 'message-image-1.jpeg'),
(11, '09:57:35', 3, 'U0002', '???? xem', 'text', '?? tao m??i c???p nh???t ch??t socket ??'),
(12, '09:58:32', 1, 'U0002', '???? xem', 'text', '???a, tao th???y r???i'),
(13, '09:59:02', 3, 'U0002', '???? xem', 'text', 'm??y ki???m tra l???i coi ???n ch??a'),
(14, '09:59:02', 3, 'U0002', '???? xem', 'text', 'm??y ki???m tra l???i coi ???n ch??a'),
(15, '09:59:24', 1, 'U0002', '???? xem', 'text', 'oke man'),
(16, '10:32:03', 3, 'U0002', '???? xem', 'media', '0D0C7E22-2EBF-4C26-B080-0BA95D7F3E14-1643427123178.jpg'),
(17, '10:32:03', 3, 'U0002', '???? xem', 'media', '0D0C7E22-2EBF-4C26-B080-0BA95D7F3E14-1643427123183.jpg'),
(18, '10:33:45', 3, 'U0002', '???? xem', 'media', '0D0C7E22-2EBF-4C26-B080-0BA95D7F3E14-1643427225994.jpg'),
(23, '10:52:02', 3, 'U0002', '???? xem', 'document', 'curriculum-vitate 1,1-1643428322428.pdf'),
(24, '11:54:29', 3, 'U0002', '???? xem', 'document', 'curriculum-vitate 1,0-1643432069008.pdf'),
(25, '12:33:42', 3, 'U0002', '???? xem', 'link', 'www.google.com'),
(26, '12:38:03', 3, 'U0002', '???? nh???n', 'link', 'www.youtube.com');

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
(1, 'nguyenvanan@gmail.com', '$2b$10$MXLXIYkAvJyHrrWtcS40JuiDmazrNRM1/smnb6sSrvbHtU6BfgFyK', '2000-02-12', 'An', 'Nguy???n V??n', 0, 'avatar-1.jpeg', 0),
(2, 'phanvantung@gmail.com', '$2b$10$mYdMExK.Kvbu9hvAYPl3b.0P9ZifbqgLQHF6nHiOyoMhuHNkLZ7c2', '1999-03-11', 'T??ng', 'Phan V??n', 0, 'avatar-2.jpeg', 0),
(3, 'lethuyduong@gmail.com', '$2b$10$0CiN01Ti/P71fgB8bkcVJuSyAVCISQ6anord4MsAZ928Gt1VKYJom', '2000-05-09', 'D????ng', 'L?? Thu???', 1, 'avatar-3.jpeg', 0),
(4, 'nguyenleanhtu@gmail.com', '$2b$10$Q5sZ3OBWYcJ2cQinBrK5bu.33vzHxaLnSu5f3gL76BASEijvNpMaG', '2000-11-20', 'T??', 'Nguy???n L?? Anh', 0, 'avatar-4.jpeg', 0),
(5, 'tranhuyentrang@gmail.com', '$2b$10$nnizKb4yiMvy0sQrKSe4l.xENzNKo9/IPgeonnnUG7ZfZ8TBnjNlm', '2001-10-20', 'Trang', 'Tr???n Huy???n', 0, 'avatar-5.jpeg', 0),
(6, 'ni@gmail.com', '$2b$10$Rzg8bMR8V7AIOnm8TwyrluSlzdI.irDYHg05mvelTbSqTeREkzvse', '2000-01-19', 'Ni', 'Nguyen To', 1, '', 1);

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
-- Indexes for table `emotion`
--
ALTER TABLE `emotion`
  ADD KEY `sendId` (`sendId`),
  ADD KEY `messageId` (`messageId`);

--
-- Indexes for table `friend`
--
ALTER TABLE `friend`
  ADD PRIMARY KEY (`sendId`,`receiveId`),
  ADD KEY `sendId` (`sendId`),
  ADD KEY `receiveId` (`receiveId`);

--
-- Indexes for table `groupuser`
--
ALTER TABLE `groupuser`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`id`),
  ADD KEY `receiveId` (`receiveId`),
  ADD KEY `sendId` (`sendId`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `waitingresquest`
--
ALTER TABLE `waitingresquest`
  ADD PRIMARY KEY (`sendId`,`receiveId`),
  ADD KEY `sendId` (`sendId`),
  ADD KEY `receiveId` (`receiveId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `message`
--
ALTER TABLE `message`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

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
-- Constraints for table `emotion`
--
ALTER TABLE `emotion`
  ADD CONSTRAINT `emotion_ibfk_1` FOREIGN KEY (`sendId`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `emotion_ibfk_2` FOREIGN KEY (`messageId`) REFERENCES `message` (`id`);

--
-- Constraints for table `friend`
--
ALTER TABLE `friend`
  ADD CONSTRAINT `friend_ibfk_1` FOREIGN KEY (`sendId`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `friend_ibfk_2` FOREIGN KEY (`receiveId`) REFERENCES `user` (`id`);

--
-- Constraints for table `message`
--
ALTER TABLE `message`
  ADD CONSTRAINT `message_ibfk_1` FOREIGN KEY (`receiveId`) REFERENCES `groupuser` (`id`),
  ADD CONSTRAINT `message_ibfk_2` FOREIGN KEY (`sendId`) REFERENCES `user` (`id`);

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
