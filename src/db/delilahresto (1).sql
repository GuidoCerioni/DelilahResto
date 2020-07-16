-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 16-07-2020 a las 07:14:24
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

DROP TABLE IF EXISTS `orders`;
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
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

--
-- RELACIONES PARA LA TABLA `orders`:
--   `id_user`
--       `users` -> `id`
--   `id_paymentType`
--       `orders_payment_type` -> `id`
--

--
-- Truncar tablas antes de insertar `orders`
--

TRUNCATE TABLE `orders`;
--
-- Volcado de datos para la tabla `orders`
--

INSERT INTO `orders` VALUES
(11, 103, 1, 'new', '2020-07-16 05:04:05', '2. Hamburguesa con queso, 1. Hamburguesa con jyq, 3. Papas cheddar', 'sarasa 123', 710),
(12, 103, 1, 'new', '2020-07-16 05:06:14', '2xHamburguesa con queso, 1xHamburguesa con jyq, 3xPapas cheddar', 'sarasa 123', 710);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orders_payment_type`
--

DROP TABLE IF EXISTS `orders_payment_type`;
CREATE TABLE IF NOT EXISTS `orders_payment_type` (
  `id` int(1) NOT NULL,
  `paymentType` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELACIONES PARA LA TABLA `orders_payment_type`:
--

--
-- Truncar tablas antes de insertar `orders_payment_type`
--

TRUNCATE TABLE `orders_payment_type`;
--
-- Volcado de datos para la tabla `orders_payment_type`
--

INSERT INTO `orders_payment_type` VALUES
(1, 'cash'),
(2, 'credit card'),
(3, 'debit card'),
(4, 'other');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orders_products`
--

DROP TABLE IF EXISTS `orders_products`;
CREATE TABLE IF NOT EXISTS `orders_products` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `id_order` int(10) NOT NULL,
  `id_product` int(5) NOT NULL,
  `productQuantity` int(5) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_order` (`id_order`),
  KEY `id_product` (`id_product`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4;

--
-- RELACIONES PARA LA TABLA `orders_products`:
--   `id_order`
--       `orders` -> `id`
--   `id_product`
--       `products` -> `id`
--

--
-- Truncar tablas antes de insertar `orders_products`
--

TRUNCATE TABLE `orders_products`;
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
-- RELACIONES PARA LA TABLA `products`:
--

--
-- Truncar tablas antes de insertar `products`
--

TRUNCATE TABLE `products`;
--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` VALUES
(1, 'Hamburguesa con queso', 150, 'Clasica hamburguesa con queso cheddar', 1),
(2, 'Hamburguesa con jyq', 110, 'Hamburguesa con jamon y quso', 1),
(3, 'Papas cheddar', 100, 'Papas rusticas con queso cheddar', 1);

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
  `address` varchar(50) NOT NULL,
  `isAdmin` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=115 DEFAULT CHARSET=utf8;

--
-- RELACIONES PARA LA TABLA `users`:
--

--
-- Truncar tablas antes de insertar `users`
--

TRUNCATE TABLE `users`;
--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` VALUES
(100, 'admin', 'admin123', 'Administrador', 'admin@admin.com', '384-926-1250', 'adress', 1),
(101, 'user', 'user123', 'Guido Cerioni', 'guidocdf', '123456787', 'pepe 3434', 0),

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`id_paymentType`) REFERENCES `orders_payment_type` (`id`);

--
-- Filtros para la tabla `orders_products`
--
ALTER TABLE `orders_products`
  ADD CONSTRAINT `orders_products_ibfk_1` FOREIGN KEY (`id_order`) REFERENCES `orders` (`id`),
  ADD CONSTRAINT `orders_products_ibfk_2` FOREIGN KEY (`id_product`) REFERENCES `products` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
