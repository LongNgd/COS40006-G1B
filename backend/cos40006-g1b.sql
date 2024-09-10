-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 10, 2024 at 03:46 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cos40006-g1b`
--

-- --------------------------------------------------------

--
-- Table structure for table `anomaly`
--

CREATE TABLE `anomaly` (
  `anomaly_id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  `timestamp` datetime NOT NULL,
  `type` varchar(25) DEFAULT NULL,
  `duration` int(11) DEFAULT NULL,
  `participants` int(11) DEFAULT NULL,
  `intensity` varchar(25) DEFAULT NULL,
  `evidence` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `anomaly`
--

INSERT INTO `anomaly` (`anomaly_id`, `project_id`, `timestamp`, `type`, `duration`, `participants`, `intensity`, `evidence`) VALUES
(1, 1, '2021-09-01 12:00:00', 'Fighting', 10, 2, 'High', '/src/assets/background.png'),
(2, 1, '2021-09-01 12:00:10', 'Fighting', 10, 2, 'High', '/src/assets/background.png'),
(3, 1, '2021-09-01 12:00:30', 'Fighting', 20, 4, 'Medium', '/src/assets/background.png');

-- --------------------------------------------------------

--
-- Table structure for table `project`
--

CREATE TABLE `project` (
  `project_id` int(11) NOT NULL,
  `json_id` varchar(255) DEFAULT NULL,
  `source_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `upload_date` datetime NOT NULL,
  `duration` int(11) NOT NULL,
  `save_status` varchar(50) DEFAULT NULL,
  `heatmap_path` varchar(255) DEFAULT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `project`
--

INSERT INTO `project` (`project_id`, `json_id`, `source_id`, `title`, `upload_date`, `duration`, `save_status`, `heatmap_path`, `user_id`) VALUES
(1, NULL, 1, 'First Project', '2024-08-31 16:39:34', 82, NULL, NULL, 9);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `user_name` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `email`, `password`, `user_name`) VALUES
(8, 'long@gmail.com', 'long2112', 'LongNgd'),
(9, 'test@gmail.com', '123', 'test'),
(10, 'test1@gmail.com', 'long2112', 'test');

-- --------------------------------------------------------

--
-- Table structure for table `video`
--

CREATE TABLE `video` (
  `video_id` int(11) NOT NULL,
  `file_path` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `video`
--

INSERT INTO `video` (`video_id`, `file_path`) VALUES
(1, './violence.mp4');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `anomaly`
--
ALTER TABLE `anomaly`
  ADD PRIMARY KEY (`anomaly_id`);

--
-- Indexes for table `project`
--
ALTER TABLE `project`
  ADD PRIMARY KEY (`project_id`),
  ADD KEY `source_id` (`source_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `video`
--
ALTER TABLE `video`
  ADD PRIMARY KEY (`video_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `anomaly`
--
ALTER TABLE `anomaly`
  MODIFY `anomaly_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `project`
--
ALTER TABLE `project`
  MODIFY `project_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `video`
--
ALTER TABLE `video`
  MODIFY `video_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `project`
--
ALTER TABLE `project`
  ADD CONSTRAINT `project_ibfk_1` FOREIGN KEY (`source_id`) REFERENCES `video` (`video_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
