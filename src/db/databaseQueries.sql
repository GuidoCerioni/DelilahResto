-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 05-08-2020 a las 07:37:19
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
-- Estructura de tabla para la tabla `orders`
--

CREATE TABLE IF NOT EXISTS `orders` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `id_user` int(10) NOT NULL,
  `id_paymentType` int(1) NOT NULL,
  `state` varchar(30) NOT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp(),
  `description` varchar(250) NOT NULL,
  `address` varchar(50) NOT NULL,
  `totalPrice` float NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_user` (`id_user`),
  KEY `id_paymentType` (`id_paymentType`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `orders`
--

INSERT INTO `orders` (`id`, `id_user`, `id_paymentType`, `state`, `date`, `description`, `address`, `totalPrice`) VALUES(14, 103, 1, 'new', '2020-07-17 03:09:47', '20xHamburguesa con queso', 'sarasa 123', 3000);
INSERT INTO `orders` (`id`, `id_user`, `id_paymentType`, `state`, `date`, `description`, `address`, `totalPrice`) VALUES(15, 103, 1, 'new', '2020-07-17 03:10:16', '20xHamburguesa con queso, 20xHamburguesa con jyq', 'sarasa 123', 5200);
INSERT INTO `orders` (`id`, `id_user`, `id_paymentType`, `state`, `date`, `description`, `address`, `totalPrice`) VALUES(16, 103, 1, 'new', '2020-07-17 03:10:26', '2xHamburguesa con queso, 2xHamburguesa con jyq', 'sarasa 123', 520);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orders_payment_type`
--

CREATE TABLE IF NOT EXISTS `orders_payment_type` (
  `id` int(1) NOT NULL,
  `paymentType` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `orders_payment_type`
--

INSERT INTO `orders_payment_type` (`id`, `paymentType`) VALUES(1, 'cash');
INSERT INTO `orders_payment_type` (`id`, `paymentType`) VALUES(2, 'credit card');
INSERT INTO `orders_payment_type` (`id`, `paymentType`) VALUES(3, 'debit card');
INSERT INTO `orders_payment_type` (`id`, `paymentType`) VALUES(4, 'other');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orders_products`
--

CREATE TABLE IF NOT EXISTS `orders_products` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `id_order` int(10) NOT NULL,
  `id_product` int(5) NOT NULL,
  `productQuantity` int(5) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_order` (`id_order`),
  KEY `id_product` (`id_product`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE IF NOT EXISTS `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `price` int(10) NOT NULL,
  `description` varchar(100) NOT NULL,
  `inStock` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `description`, `inStock`) VALUES(1, 'Hamburguesa con queso', 150, 'Clasica hamburguesa con queso cheddar', 1);
INSERT INTO `products` (`id`, `name`, `price`, `description`, `inStock`) VALUES(2, 'Hamburguesa con jyq', 110, 'Hamburguesa con jamon y quso', 1);
INSERT INTO `products` (`id`, `name`, `price`, `description`, `inStock`) VALUES(3, 'Papas cheddar', 100, 'Papas rusticas con queso cheddar', 1);
INSERT INTO `products` (`id`, `name`, `price`, `description`, `inStock`) VALUES(4, 'Pinta', 100, 'Pinta de cerveza', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `userName` varchar(30) NOT NULL,
  `password` varchar(22) NOT NULL,
  `fullName` varchar(30) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phoneNumber` varchar(30) NOT NULL,
  `address` varchar(50) NOT NULL,
  `isAdmin` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=128 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `userName`, `password`, `fullName`, `email`, `phoneNumber`, `address`, `isAdmin`) VALUES(72, 'ahebburn1', 'bdDcFNZSQ9Td', 'Amandie Hebburn', 'ahebburn1@yale.edu', '684-361-7493', '0230 Schmedeman Center', 0);
INSERT INTO `users` (`id`, `userName`, `password`, `fullName`, `email`, `phoneNumber`, `address`, `isAdmin`) VALUES(87, 'acollidge5', 'HlpK1Tvz2bt', 'Aurelie Collidge', 'acollidge5@canalblog.com', '798-550-1676', '1078 Mccormick Place', 0);
INSERT INTO `users` (`id`, `userName`, `password`, `fullName`, `email`, `phoneNumber`, `address`, `isAdmin`) VALUES(91, 'bburmingham3', 'bCqWUBCMD', 'Babbie Burmingham', 'bburmingham3@craigslist.org', '392-573-7718', '4190 South Parkway', 0);
INSERT INTO `users` (`id`, `userName`, `password`, `fullName`, `email`, `phoneNumber`, `address`, `isAdmin`) VALUES(92, 'atrimme4', 'E4wdISGjyF6k', 'Arnoldo Trimme', 'atrimme4@blogtalkradio.com', '744-853-3235', '555 Merry Place', 0);
INSERT INTO `users` (`id`, `userName`, `password`, `fullName`, `email`, `phoneNumber`, `address`, `isAdmin`) VALUES(94, 'mlowndsborough6', 'sSx2lBrNWk', 'Marcelline Lowndsborough', 'mlowndsborough6@dmoz.org', '345-459-2347', '7 Carpenter Place', 0);
INSERT INTO `users` (`id`, `userName`, `password`, `fullName`, `email`, `phoneNumber`, `address`, `isAdmin`) VALUES(96, 'sheinsius8', 'xGUmxLYBX8w', 'Sophey Heinsius', 'sheinsius8@netlog.com', '595-631-9409', '43 Maryland Road', 0);
INSERT INTO `users` (`id`, `userName`, `password`, `fullName`, `email`, `phoneNumber`, `address`, `isAdmin`) VALUES(98, 'cskaea', '5LS70uRX', 'Cthrine Skae', 'cskaea@163.com', '986-953-4576', '8 Anderson Hill', 0);
INSERT INTO `users` (`id`, `userName`, `password`, `fullName`, `email`, `phoneNumber`, `address`, `isAdmin`) VALUES(1, 'admin', 'admin123', 'Administrador', 'admin@admin.com', '384-926-1250', 'adress', 1);
INSERT INTO `users` (`id`, `userName`, `password`, `fullName`, `email`, `phoneNumber`, `address`, `isAdmin`) VALUES(2, 'user', 'user123', 'Guido Cerioni', 'guidocdf', '123456787', 'pepe 3434', 0);
INSERT INTO `users` (`id`, `userName`, `password`, `fullName`, `email`, `phoneNumber`, `address`, `isAdmin`) VALUES(127, '11sdfsdfsdfs', '111lsdjflskd', 'pedritosapote', 'soa2woe11@hotmail.com', '11231211231', 'skjdjksk 12', 0);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`id_paymentType`) REFERENCES `orders_payment_type` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
