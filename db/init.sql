-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:8889
-- Généré le : ven. 26 juin 2026 à 09:13
-- Version du serveur : 8.0.40
-- Version de PHP : 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `portfolio_db`
--

-- --------------------------------------------------------

--
-- Structure de la table `about_page`
--

CREATE TABLE `about_page` (
  `id` int NOT NULL DEFAULT '1',
  `header_subtitle` text COLLATE utf8mb4_unicode_ci,
  `portrait_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bio_title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bio_text` text COLLATE utf8mb4_unicode_ci,
  `philosophy_quote` text COLLATE utf8mb4_unicode_ci,
  `philosophy_author` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `header_line1` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `header_line2` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `header_accent` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `philosophy_prefix` text COLLATE utf8mb4_unicode_ci,
  `philosophy_important` text COLLATE utf8mb4_unicode_ci,
  `philosophy_suffix` text COLLATE utf8mb4_unicode_ci,
  `philosophy_text` text COLLATE utf8mb4_unicode_ci,
  `photo_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `about_page`
--

INSERT INTO `about_page` (`id`, `header_subtitle`, `portrait_url`, `bio_title`, `bio_text`, `philosophy_quote`, `philosophy_author`, `header_line1`, `header_line2`, `header_accent`, `philosophy_prefix`, `philosophy_important`, `philosophy_suffix`, `philosophy_text`, `photo_url`) VALUES
(1, 'BASÉE À LYON // DISPONIBLE 2026', NULL, 'MA VISION', 'Je m\'appelle Yonna Merlini. Mon travail explore l\'intersection entre le code et l\'image.', 'LA TECHNIQUE SANS VISION N\'EST QUE DU BRUIT.', 'YONNA MERLINI', 'DÉVELOPPEUSE', 'PHOTOGRAPHE', '&', 'LA TECHNIQUE', 'SANS VISION', 'N\'EST QUE DU BRUIT.', 'klej,cfhcfksdjfdlejfoaeizhfxkq hiecjfziojf c aorfuezoeuf,periozecfiurehcoera cr\noifcozjfeztuzopeaircauat ', 'https://res.cloudinary.com/dltejn5sh/image/upload/v1782318360/portfolio_about/atbivtngwvpy5tzbxl1t.webp');

-- --------------------------------------------------------

--
-- Structure de la table `category`
--

CREATE TABLE `category` (
  `id` int NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `category`
--

INSERT INTO `category` (`id`, `name`) VALUES
(2, 'photo'),
(1, 'web');

-- --------------------------------------------------------

--
-- Structure de la table `photo`
--

CREATE TABLE `photo` (
  `id` int NOT NULL,
  `project_id` int NOT NULL,
  `url` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_cover` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `project`
--

CREATE TABLE `project` (
  `id` int NOT NULL,
  `title` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `github_url` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `demo_url` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `client` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date_realisation` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `visibility` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT 'Publié',
  `isFeatured` tinyint(1) DEFAULT '0',
  `category_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `project`
--

INSERT INTO `project` (`id`, `title`, `description`, `github_url`, `demo_url`, `created_at`, `updated_at`, `client`, `role`, `date_realisation`, `visibility`, `isFeatured`, `category_id`) VALUES
(34, 'Projet photo', 'c\'est une plante verte', NULL, NULL, '2026-06-24 13:53:15', '2026-06-26 09:09:36', 'perso', NULL, '2026', 'Publié', 1, 2),
(35, 'un autre projet ', 'plante', NULL, NULL, '2026-06-24 16:13:25', '2026-06-26 09:09:36', 'personnel', NULL, '2026', 'Publié', 1, 1),
(37, 'abcdefgh', 'June ', '', '', '2026-06-25 08:22:46', '2026-06-26 09:09:36', 'June M', 'dev', '2026', 'Publié', 1, 2);

-- --------------------------------------------------------

--
-- Structure de la table `technology`
--

CREATE TABLE `technology` (
  `id` int NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `project_technology`
--

CREATE TABLE `project_technology` (
  `project_id` int NOT NULL,
  `technology_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` int NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `email`, `password`, `role`, `created_at`) VALUES
(1, 'admin@portfolio.fr', '$2b$10$2x2SH2IwXKNkAYqNwBSpjuH6vEUeL1MywtWEC5RNUX4if7QCxHaZm', 'admin', '2026-05-05 10:35:09');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `about_page`
--
ALTER TABLE `about_page`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Index pour la table `photo`
--
ALTER TABLE `photo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `project_id` (`project_id`);

--
-- Index pour la table `project`
--
ALTER TABLE `project`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_project_category` (`category_id`);

--
-- Index pour la table `technology`
--
ALTER TABLE `technology`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Index pour la table `project_technology`
--
ALTER TABLE `project_technology`
  ADD PRIMARY KEY (`project_id`,`technology_id`),
  ADD KEY `technology_id` (`technology_id`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `category`
--
ALTER TABLE `category`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `photo`
--
ALTER TABLE `photo`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `project`
--
ALTER TABLE `project`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT pour la table `technology`
--
ALTER TABLE `technology`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `photo`
--
ALTER TABLE `photo`
  ADD CONSTRAINT `photo_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `project`
--
ALTER TABLE `project`
  ADD CONSTRAINT `fk_project_category` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE SET NULL;

--
-- Contraintes pour la table `project_technology`
--
ALTER TABLE `project_technology`
  ADD CONSTRAINT `project_technology_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `project_technology_ibfk_2` FOREIGN KEY (`technology_id`) REFERENCES `technology` (`id`) ON DELETE CASCADE;

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER