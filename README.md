# Passerelle A11y

> La passerelle vers un web accessible à tous

Plateforme d'audit d'accessibilité web open-source, pédagogique et collaborative.

[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)
[![Vue 3](https://img.shields.io/badge/Vue-3-42b883)](https://vuejs.org/)
[![AdonisJS](https://img.shields.io/badge/AdonisJS-6-5a45ff)](https://adonisjs.com/)
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

Passerelle A11y est née d'un constat simple : l'accessibilité web est souvent perçue comme complexe et technique, alors qu'elle devrait être à la portée de tous les créateurs de sites web.

Issue de 6 années d'expérience dans le médico-social et d'une reconversion dans le développement web, Passerelle A11y construit un pont entre les besoins réels des utilisateurs et les pratiques des développeurs.

**Approche pédagogique :** Explications claires, pas de jargon technique inutile. L'outil guide l'utilisateur vers des améliorations concrètes plutôt que de le submerger de normes.

## Fonctionnalités (MVP)

- **Authentification** — Inscription, connexion et gestion de compte sécurisées
- **Gestion de projets** — Création, modification et suivi de plusieurs sites web (CRUD)
- **Analyse automatisée** — Tests d'accessibilité basés sur WCAG 2.1 (niveaux A et AA) via Axe-core

### Post-MVP 

- Score d'accessibilité et rapport détaillé avec recommandations
- Export PDF des rapports d'audit
- Historique et suivi temporel des analyses
- Comparaisons avant/après
- Tests manuels guidés
- Suggestions de correction automatiques
- API publique
- Modèle freemium

## Stack Technique

### Frontend
- **Vue 3** : Framework JavaScript pour l'interface utilisateur
- **TypeScript** : JavaScript avec typage pour moins d'erreurs
- **TailwindCSS** : Styles et design responsive

### Backend
- **AdonisJS 6** : Framework Node.js pour l'API
- **SQLite** : Base de données via better-sqlite3
- **Axe-core** : Moteur d'analyse d'accessibilité

### Outils
- **Git & GitHub** : Versionning et collaboration
- **GitHub Projects & Issues** : Suivi d'avancement à l'aide de Kanban et Tickets

## Roadmap

### Phase 1 - MVP (Février - Mai 2025)

- [x] Définition de l'architecture
- [x] Choix de la stack technique
- [ ] Setup projet et base de données
- [ ] Authentification utilisateurs
- [ ] Système de projets (CRUD)
- [ ] Intégration Axe-core
- [ ] Déploiement MVP

> Le suivi détaillé des tickets est disponible sur [GitHub Projects](https://github.com/aymericpbdev/passerelle-a11y/projects)

### Phase 2 - Post-MVP (Après diplôme)

- [ ] Score d'accessibilité et rapports détaillés
- [ ] Export PDF
- [ ] Historique et comparaisons temporelles
- [ ] Tests manuels guidés
- [ ] Suggestions de correction automatiques
- [ ] API publique
- [ ] Modèle freemium

## Contexte

Ce projet est développé dans le cadre d'un **Titre Professionnel Développeur Web et Web Mobile** (Niveau 5 - Bac+2).

**Objectifs pédagogiques :**
- Concevoir et développer une application web full-stack
- Implémenter une architecture scalable et maintenable
- Appliquer les bonnes pratiques de développement (clean code, sécurité, accessibilité)
- Gérer un projet de A à Z (conception, développement, déploiement)

**Présentation du diplôme :** Juin 2026

## Licence

Ce projet est sous double licence :

### Licence Open-Source (AGPL-3.0)

Le code source est disponible sous [GNU Affero General Public License v3.0](https://www.gnu.org/licenses/agpl-3.0.html).

**Vous pouvez :**
- ✅ Utiliser le logiciel gratuitement
- ✅ Voir et modifier le code source
- ✅ Distribuer vos modifications

**À condition de :**
- ⚠️ Publier vos modifications sous la même licence (AGPL-3.0)
- ⚠️ Fournir le code source même si vous hébergez le service en ligne
- ⚠️ Créditer l'auteur original

### Licence Commerciale

Pour toute utilisation commerciale ne respectant pas les termes de l'AGPL-3.0, contactez-moi pour discuter d'une licence commerciale.

**Contact :** aymericpb.dev@gmail.com

## Contribuer

Les contributions sont les bienvenues ! Ce projet étant en phase de développement actif, n'hésitez pas à :

- 🐛 Signaler des bugs via les [Issues](https://github.com/aymericpbdev/passerelle-a11y/issues)
- 💡 Proposer des améliorations
- 🔧 Soumettre des Pull Requests

Toute contribution sera sous licence AGPL-3.0.

## Auteur

**Aymeric PAIN BLAVEC**

- 6 ans d'expérience dans le secteur médico-social
- En reconversion développement web
- Passionné par l'accessibilité numérique et l'inclusion

**Contact :**
- Email : aymericpb.dev@gmail.com
- LinkedIn : [aymeric-painblavec](https://www.linkedin.com/in/aymeric-painblavec/)
- GitHub : [@aymericpbdev](https://github.com/aymericpbdev)

## Remerciements

- [Axe-core](https://github.com/dequelabs/axe-core) par Deque Systems
- La communauté open-source pour ses futures contributions
- Mes formateurs et pairs en reconversion

---


**Construit pour un web accessible à tous**




