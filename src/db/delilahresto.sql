-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 15-07-2020 a las 08:49:04
-- Versión del servidor: 10.4.11-MariaDB
-- Versión de PHP: 7.4.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "-03:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `delilahresto`
--
CREATE DATABASE IF NOT EXISTS `delilahresto` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `delilahresto`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

DROP TABLE IF EXISTS `products`;
CREATE TABLE IF NOT EXISTS `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `price` int(10) NOT NULL,
  `description` varchar(100) NOT NULL,
  `inStock` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` VALUES
(44, 'Hamburguesa con queso', 150, 'Clasica hamburguesa con queso cheddar', 1),
(45, 'Hamburguesa con queso1', 110, 'Clasica hamburguesa con queso cheddar', 1),
(46, 'Hamburguesa', 100, 'Clasica hamburguesa con queso cheddar', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `userName` varchar(30) NOT NULL,
  `password` varchar(30) NOT NULL,
  `fullName` varchar(30) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phoneNumber` varchar(30) NOT NULL,
  `adress` varchar(50) NOT NULL,
  `isAdmin` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=115 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` VALUES
(17, 'dvedikhov0', 'Fee5bnB9PWDa', 'Doyle Vedikhov', 'dvedikhov0@macromedia.com', '419-619-7662', '664 Coleman Terrace', 0),
(28, 'acobson7', 'ss8ZLDE7', 'Arabella Cobson', 'acobson7@forbes.com', '594-252-5006', '3072 Hanson Alley', 0),
(36, 'rleavesley9', 'QhdOGvbu', 'Randall Leavesley', 'rleavesley9@imgur.com', '162-613-7751', '505 Pawling Park', 0),
(37, 'erentcomeb', 'uMLlkpl47XAc', 'Efren Rentcome', 'erentcomeb@cloudflare.com', '384-926-1250', '42 Nancy Plaza', 0),
(49, 'lraggles2', 'Qg0w8WIY3w', 'Lucias Raggles', 'lraggles2@ustream.tv', '641-270-8505', '5 Meadow Ridge Point', 0),
(72, 'ahebburn1', 'bdDcFNZSQ9Td', 'Amandie Hebburn', 'ahebburn1@yale.edu', '684-361-7493', '0230 Schmedeman Center', 0),
(87, 'acollidge5', 'HlpK1Tvz2bt', 'Aurelie Collidge', 'acollidge5@canalblog.com', '798-550-1676', '1078 Mccormick Place', 0),
(91, 'bburmingham3', 'bCqWUBCMD', 'Babbie Burmingham', 'bburmingham3@craigslist.org', '392-573-7718', '4190 South Parkway', 0),
(92, 'atrimme4', 'E4wdISGjyF6k', 'Arnoldo Trimme', 'atrimme4@blogtalkradio.com', '744-853-3235', '555 Merry Place', 0),
(94, 'mlowndsborough6', 'sSx2lBrNWk', 'Marcelline Lowndsborough', 'mlowndsborough6@dmoz.org', '345-459-2347', '7 Carpenter Place', 0),
(96, 'sheinsius8', 'xGUmxLYBX8w', 'Sophey Heinsius', 'sheinsius8@netlog.com', '595-631-9409', '43 Maryland Road', 0),
(98, 'cskaea', '5LS70uRX', 'Cthrine Skae', 'cskaea@163.com', '986-953-4576', '8 Anderson Hill', 0),
(100, 'admin', 'admin123', 'Administrador', 'admin@admin.com', '384-926-1250', 'adress', 1),
(103, 'Guido123', '5465654', 'Guido Cerioni', 'guidocdf', '123456787', 'pepe 3434', 0),
(114, 'asdas', 'asdasdd', 'Guidd sapasda', '389123911', '2222222', 'lala 3432', 0);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
