# Passerelle A11y

> La passerelle vers un web accessible à tous

Plateforme d'audit d'accessibilité web open-source et pédagogique.

[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)
[![Vue 3](https://img.shields.io/badge/Vue-3-42b883)](https://vuejs.org/)
[![AdonisJS](https://img.shields.io/badge/AdonisJS-7-5a45ff)](https://adonisjs.com/)
[![Status](https://img.shields.io/badge/Status-En%20développement-yellow)]()

---

## Table des matières

- [Vision](#vision)
- [Fonctionnalités](#fonctionnalités)
- [Stack technique](#stack-technique)
- [Roadmap](#roadmap)
- [Contexte](#contexte)
- [Licence](#licence)
- [Contribuer](#contribuer)
- [Auteur](#auteur)

## Vision

Passerelle A11y part d'un constat simple. L'accessibilité web est souvent perçue comme complexe et réservée aux spécialistes, alors qu'elle devrait être à la portée de tous ceux qui construisent des sites.

Le projet est né de six années d'expérience dans le secteur médico-social et d'une reconversion vers le développement web. Cette double origine nourrit son approche, faire le lien entre les besoins réels des personnes et les pratiques des développeurs.

L'outil se veut pédagogique. Plutôt que de submerger l'utilisateur de normes, il met en avant des problèmes concrets et oriente vers leur correction, en s'appuyant sur la documentation de référence. Chaque audit devient une occasion d'apprendre.

## Fonctionnalités

### Déjà en place (MVP)

- Authentification, inscription et connexion sécurisées
- Gestion de projets, création et consultation de plusieurs sites à auditer
- Analyse automatisée d'accessibilité, fondée sur WCAG 2.1 niveaux A et AA, via le moteur Axe-core
- Score d'accessibilité et liste détaillée des violations, regroupées par gravité, avec un lien vers la documentation de correction

### Prévu (post-MVP)

- Modification et suppression de projets
- Historique et suivi des audits dans le temps, comparaisons avant et après
- Export des rapports d'audit
- Évolution vers un audit fondé sur le RGAA, le référentiel français, en complément de WCAG
- Un modèle freemium, non encore en place, est envisagé pour la pérennité du projet

## Stack technique

### Frontend

- Vue 3, framework JavaScript pour l'interface
- TypeScript, pour un typage qui limite les erreurs
- Pinia, pour la gestion de l'état de l'application
- TailwindCSS 4, pour le style et le responsive
- Vite, pour le développement et le build

### Backend

- AdonisJS 7, framework Node.js pour l'API
- SQLite, accédé via l'ORM Lucid avec le driver better-sqlite3
- Axe-core, exécuté dans un navigateur sans interface piloté par Puppeteer, pour le moteur d'analyse

L'accès aux données passe par l'ORM Lucid, ce qui rend l'application indépendante du moteur de base sous-jacent. Une connexion PostgreSQL est d'ailleurs déjà déclarée dans la configuration, ce qui permettrait, si le besoin s'en faisait sentir, de basculer de SQLite vers PostgreSQL en changeant un simple paramètre, sans réécrire le code d'accès aux données.

### Outils

- Git et GitHub, versionnement et suivi
- Police Atkinson Hyperlegible Next, conçue pour améliorer la lisibilité des personnes malvoyantes

## Roadmap

### Phase 1, MVP (février à mai 2026)

- [x] Définition de l'architecture
- [x] Choix de la stack technique
- [x] Mise en place du projet et de la base de données
- [x] Authentification des utilisateurs
- [x] Gestion de projets, création et consultation
- [x] Intégration d'Axe-core et moteur d'audit
- [x] Documentation du déploiement, en local pour le moment

### Phase 2, post-MVP

- [ ] Modification et suppression de projets
- [ ] Historique et comparaisons dans le temps
- [ ] Export des rapports
- [ ] Audit fondé sur le RGAA en complément de WCAG
- [ ] Réflexion sur un modèle freemium et une éventuelle bascule vers PostgreSQL

## Contexte

Ce projet est développé dans le cadre du Titre Professionnel Développeur Web et Web Mobile, de niveau 5.

Il est né dans une démarche d'apprentissage, comme projet de formation, mais il a été pensé pour pouvoir évoluer au-delà de cet exercice. Les choix techniques, l'architecture et la documentation ont été menés dans cet esprit.

Présentation du diplôme, juin 2026.

## Licence

Le projet est sous double licence.

### Licence open-source, AGPL-3.0

Le code source est disponible sous GNU Affero General Public License v3.0.

Vous pouvez utiliser, étudier, modifier et distribuer le logiciel, à condition de publier vos modifications sous la même licence, de fournir le code source même en cas d'hébergement du service en ligne, et de créditer l'auteur d'origine.

### Licence commerciale

Une licence commerciale pourra être proposée pour les usages ne relevant pas des termes de l'AGPL-3.0. Cette option n'est pas encore en place, elle accompagne la réflexion sur la pérennité du projet. Pour toute question, le contact est indiqué plus bas.

## Contribuer

Les contributions sont les bienvenues. Le projet étant en développement, vous pouvez signaler un bug ou proposer une amélioration via les issues, ou soumettre une pull request. Les conventions sont décrites dans le fichier CONTRIBUTING.

Toute contribution est placée sous licence AGPL-3.0.

## Auteur

Aymeric Pain Blavec

Issu de six années dans le secteur médico-social, en reconversion vers le développement web, attaché à l'accessibilité numérique et à l'inclusion.

Contact, aymericpb.dev@gmail.com

LinkedIn, aymeric-painblavec

GitHub, aymericpbdev

## Remerciements

- Axe-core, par Deque Systems
- La communauté open-source
- Mes formateurs et mes pairs en reconversion

---

Construit pour un web accessible à tous