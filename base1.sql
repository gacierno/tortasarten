-- phpMyAdmin SQL Dump
-- version 4.4.10
-- http://www.phpmyadmin.net
--
-- Host: localhost:3306
-- Generation Time: Mar 16, 2016 at 07:38 PM
-- Server version: 5.5.42
-- PHP Version: 7.0.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `base1`
--

-- --------------------------------------------------------

--
-- Table structure for table `movements`
--

CREATE TABLE `movements` (
  `OpNumber` int(11) NOT NULL,
  `Date` date NOT NULL,
  `User` tinytext NOT NULL,
  `Task` tinytext NOT NULL,
  `Client` tinytext NOT NULL,
  `Proyecto` tinytext NOT NULL,
  `Horas` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `movements`
--

INSERT INTO `movements` (`OpNumber`, `Date`, `User`, `Task`, `Client`, `Proyecto`, `Horas`) VALUES
(1, '2016-03-16', 'invitado', ' cfdxs', 'fcedxw', 'cualquiera', 2),
(1, '2016-03-16', 'invitado', ' cfdxs', 'fcedxw', 'cualquiera', 2),
(3, '2016-03-16', 'invitado', 'ce2vcr', 'crewcrw', 'crwrg', 5),
(4, '2016-03-16', 'invitado', 'cerwvc wr', 'vtrwvtw', 'vtrwvtw', 3),
(5, '2016-03-16', 'invitado', 'cerwvc wr', 'vtrwvtw', 'vtrwvtw', 3),
(6, '2016-03-16', 'german@thebytery.com', 'wgtrgt', 'vterver', 'vertvte', 3),
(7, '2016-03-16', 'german@thebytery.com', 'wgtrgt', 'vterver', 'vertvte', 3),
(8, '2016-03-16', 'franco@thebytery.com', 'univer', 'nfnq', 'fweqfewq', 34),
(9, '2016-03-16', 'daniela@thebytery.com', 'peperino poporo', 'hgfd', 'brvegr', 4),
(10, '2016-03-16', 'daniela@thebytery.com', 'university of la chota', 'stelter', 'semana 2', 2),
(11, '2016-03-16', 'franco@thebytery.com', 'nviuewnvuie', 'elcho', 'cualquiera', 123),
(12, '2016-03-16', 'daniela@thebytery.com', 'verwvw', 'vrewverw', 'vrwvrew', 2),
(13, '2016-03-16', 'franco@thebytery.com', 'cwt', 'vrevrw', '24d3d', 3),
(14, '2016-03-16', 'german@thebytery.com', 'ybtrc', 'brvcex', 'etnbuu', 9),
(15, '2016-03-16', 'german@thebytery.com', 'otro', 'otro', 'otro', 2),
(16, '2016-03-16', 'franco@thebytery.com', 'elcho', 'elcho', 'elcho', 5),
(17, '2016-03-16', 'daniela@thebytery.com', 'fafaf', 'montana', 'stelter', 3);

-- --------------------------------------------------------

--
-- Table structure for table `users1`
--

CREATE TABLE `users1` (
  `Nombre` tinytext NOT NULL,
  `Apellido` tinytext NOT NULL,
  `Mail` tinytext NOT NULL,
  `Password` tinytext NOT NULL,
  `SecLevel` tinytext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users1`
--

INSERT INTO `users1` (`Nombre`, `Apellido`, `Mail`, `Password`, `SecLevel`) VALUES
('German', 'Acierno', 'german@thebytery.com', 'n3m3515', 'user'),
('Juliana', 'Coriale', 'juliana@thebytery.com', 'n3m3515', 'user'),
('Daniela', 'Giraldez', 'daniela@thebytery.com', 'n3m3515', 'user'),
('', '', 'invitado', '', ''),
('Franco', 'Galan', 'franco@thebytery.com', 'n3m3515', 'user');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
