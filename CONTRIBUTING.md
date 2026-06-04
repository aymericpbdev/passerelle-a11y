# Contribuer à Passerelle A11y

Merci de votre intérêt pour le projet. Passerelle A11y est développé dans le cadre d'une formation et a vocation à évoluer, toute aide est la bienvenue.

---

## Comment contribuer

### Proposer une idée ou signaler un bug

Ouvrez une issue pour signaler un bug, proposer une amélioration ou poser une question.

### Contribuer au code

1. Forkez le projet et clonez-le localement
2. Créez une branche dédiée à votre contribution
3. Faites vos modifications en suivant les conventions ci-dessous
4. Testez localement que tout fonctionne
5. Ouvrez une pull request avec une description claire

---

## Conventions de commit

L'historique du projet suit une logique simple, un commit correspond à une action cohérente, et son message décrit ce qui a été fait. Préférez un message clair et descriptif à un message vague.

Quelques exemples de messages clairs.

```
feat: ajout de l'authentification utilisateur
fix: correction du calcul de score
docs: mise à jour du README
a11y: amélioration de la navigation au clavier
```

À éviter, les messages qui ne disent rien.

```
update
fix
changes
```

Référencez les issues concernées quand c'est pertinent, par exemple avec Closes #12.

### À propos de Gitmoji

La convention Gitmoji, qui préfixe les messages de commit d'un emoji, est une possibilité que vous pouvez adopter si vous l'appréciez. Elle rend l'historique visuel et certains contributeurs y trouvent du confort. Elle n'est pas imposée sur ce projet. Le plus important reste la clarté du message lui-même.

---

## Pull requests

### Titre

Le titre suit la même logique que les messages de commit, un type suivi d'une description courte.

```
feat: ajout du tableau de bord des projets
fix: correction d'un bug d'authentification
```

### Description

Une bonne description répond à trois questions. Quoi, ce que vous avez changé. Pourquoi, le problème que cela résout. Comment tester, si c'est pertinent.

Exemple.

```markdown
## Description
Ajout de l'export des rapports d'audit.

## Changements
- Nouveau bouton de téléchargement sur la page de résultats
- Génération du rapport avec le score et la liste des violations

## Tests
1. Lancer un audit
2. Cliquer sur le bouton de téléchargement
3. Vérifier que le rapport contient le score et les violations

Closes #15
```

---

## Conventions de code

### Général

- Nommez clairement, préférez calculateAccessibilityScore à calc ou score
- Typez vos fonctions et vos composants avec TypeScript
- Commentez ce qui est complexe, en expliquant le pourquoi plutôt que le quoi

### Accessibilité, essentielle sur ce projet

- Utilisez des balises sémantiques, button, nav, main, plutôt que des conteneurs neutres
- Donnez un texte alternatif aux images porteuses de sens
- Assurez-vous que tout est utilisable au clavier, testez avec la touche Tab
- Vérifiez les contrastes de couleurs, au minimum le niveau WCAG AA

### Exemple, un composant Vue

Un composant lisible, typé, et construit avec des balises sémantiques.

```vue
<script setup lang="ts">
interface Props {
  name: string
  email: string
}

defineProps<Props>()
</script>

<template>
  <article>
    <h2>{{ name }}</h2>
    <p>{{ email }}</p>
  </article>
</template>
```

À l'inverse, à éviter, un composant non typé et peu lisible, qui s'appuie sur des conteneurs neutres sans structure.

```vue
<script setup>
const props = defineProps(['n'])
</script>

<template>
  <div>{{ props.n }}</div>
</template>
```

---

## Tester l'accessibilité

Avant de soumettre une pull request qui touche à l'interface, quelques vérifications.

1. Navigation au clavier, testez avec Tab, Entrée et Échap
2. Lecteur d'écran, si possible, testez avec NVDA sur Windows ou VoiceOver sur Mac
3. Contrastes, vérifiez avec un outil comme le WebAIM Contrast Checker

---

## Questions

Pour toute question, vous pouvez ouvrir une issue ou écrire à aymericpb.dev@gmail.com.

---

Merci de contribuer à un web plus accessible.