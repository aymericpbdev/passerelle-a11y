# 🤝 Contribuer à Passerelle A11y

Merci de votre intérêt pour contribuer ! Ce projet est en cours de développement dans le cadre d'une formation, toute aide est la bienvenue. 🌉

---

## 🚀 Comment contribuer ?

### 1. Proposer des idées ou signaler des bugs

Ouvrez une [Issue](https://github.com/aymericpbdev/passerelle-a11y/issues) pour :
- 🐛 Signaler un bug
- 💡 Proposer une amélioration
- 🤔 Poser une question

### 2. Contribuer au code

1. **Fork le projet** et clone-le localement
2. **Créez une branche** pour votre contribution
3. **Faites vos modifications** en suivant les conventions ci-dessous
4. **Testez localement** que tout fonctionne
5. **Créez une Pull Request** avec une description claire

---

## 📝 Convention des Commits (GitMoji)

Pour rendre l'historique Git clair et visuel, nous utilisons des **emojis GitMoji**.

### Format recommandé
```
<emoji> <type>: <description courte>
```

### Emojis principaux

| Emoji | Usage | Exemple |
|-------|-------|---------|
| ✨ | Nouvelle fonctionnalité | `✨ feat: add PDF export` |
| 🐛 | Correction de bug | `🐛 fix: resolve score calculation error` |
| 📝 | Documentation | `📝 docs: update README` |
| 💄 | Interface/Style | `💄 style: improve dashboard layout` |
| ♻️ | Refactoring | `♻️ refactor: simplify analysis service` |
| ✅ | Tests | `✅ test: add unit tests for scoring` |
| 🔧 | Configuration | `🔧 chore: update dependencies` |
| ♿️ | Accessibilité | `♿️ a11y: improve keyboard navigation` |
| 🚧 | Travail en cours | `🚧 wip: analysis page structure` |

**Liste complète :** [gitmoji.dev](https://gitmoji.dev/)

### Exemples concrets

**Bons commits :**
```bash
✨ feat: add user authentication
🐛 fix: correct contrast calculation
📝 docs: add API documentation
♿️ a11y: improve focus indicators
```

**À éviter :**
```bash
❌ update stuff
❌ fix
❌ changes
```

### Conseils

- **Soyez descriptif** : Le commit doit expliquer ce qui a été fait
- **Une action logique par commit** : Pas de commit fourre-tout
- **Référencez les issues** si pertinent : `Closes #12` ou `Fixes #24`

---

## 🔍 Pull Requests

### Titre de la PR

Même format que les commits :
```
✨ feat: add project dashboard
🐛 fix: resolve authentication bug
```

### Description

Expliquez simplement :
- **Quoi** : Qu'avez-vous changé ?
- **Pourquoi** : Quelle problématique ça résout ?
- **Comment tester** : Si pertinent

**Exemple :**
```markdown
## Description
Ajout de l'export PDF des rapports d'analyse.

## Changements
- Intégration de PDFKit
- Nouveau bouton "Télécharger PDF" sur la page de résultats
- Template de rapport avec logo et scores

## Tests
1. Lancer une analyse
2. Cliquer sur "Télécharger PDF"
3. Vérifier que le PDF contient le score et les erreurs

Closes #15
```

---

## 🎨 Quelques conventions de code

### Général
- **Nommer clairement** : Préférez `calculateAccessibilityScore` à `calc` ou `score`
- **Typage TypeScript** : Typez vos fonctions et composants
- **Commentez si complexe** : Expliquez le "pourquoi", pas le "quoi"

### Accessibilité (crucial pour ce projet !)
- Utilisez des **balises sémantiques** (`<button>`, `<nav>`, `<main>`)
- Ajoutez `alt` aux images
- Assurez-vous que tout est **navigable au clavier** (testez avec Tab)
- Vérifiez les **contrastes de couleurs** (minimum WCAG AA)

### Exemples

**✅ Bon :**
```typescript
interface UserProps {
  name: string;
  email: string;
}

export function UserCard({ name, email }: UserProps) {
  return (
    <article>
      <h2>{name}</h2>
      <p>{email}</p>
    </article>
  );
}
```

**❌ À éviter :**
```typescript
export default (props) => {
  return <div>{props.n}</div>; // Nommage peu clair, pas de typage
}
```

---

## ♿️ Tester l'accessibilité

Avant de soumettre une PR avec des changements UI :

1. **Navigation clavier** : Testez avec Tab, Enter, Escape
2. **Lecteur d'écran** : Si possible, testez avec NVDA (Windows) ou VoiceOver (Mac)
3. **Contrastes** : Vérifiez avec [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

---

## 💬 Questions ou problèmes ?

N'hésitez pas à :
- Ouvrir une [Issue](https://github.com/aymericpbdev/passerelle-a11y/issues)
- Me contacter : aymericpb.dev@gmail.com

---

**Merci de contribuer à un web plus accessible ! 🌉**