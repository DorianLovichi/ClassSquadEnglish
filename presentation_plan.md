# 🎙️ Plan de Présentation : Class Squad (5 Minutes)

**Objectif :** Présenter la refonte "Premium" de l'interface Class Squad, en mettant en avant les choix UX/UI et la solidité technique.

---

## ⏱️ Structure du Pitch

### 1. Introduction & Concept (45 sec)

- **Accroche :** "Bonjour. Le projet _Class Squad_ avait pour but de présenter notre promo, mais je voulais dépasser la simple liste de noms pour créer une véritable **expérience immersive**."
- **Concept :** Une interface inspirée des clubs de sport d'élite (style Manchester United), mais traitée avec une esthétique "Tech Premium" moderne.
- **Objectif UX :** Transformer une consultation passive en une exploration engageante.

### 2. Design & UX : L'Approche "Premium" (1 min 30)

- **L'Identité Visuelle (Dark Luxury) :**
  - Explication du choix du thème sombre (`#050505`) avec des dégradés subtils pour éviter l'effet "plat".
  - Usage du **Glassmorphism** (effet de verre flouté) sur le header pour une navigation qui respire et laisse la place au contenu.
- **Micro-interactions (Le facteur "Waouh") :**
  - Montrez les cartes joueurs : "Regardez comment l'interface réagit."
  - _Démonstration :_ Survol d'une carte → Zoom élastique de la photo + Soulèvement de la carte + Apparition du filigrane (numéro).
  - **Pourquoi ?** "Ces détails créent une sensation de fluidité et de réactivité. L'utilisateur a l'impression de toucher une interface vivante."

### 3. Architecture Technique (1 min 30)

- **Stack :** "J'ai fait le choix de la légèreté et de la performance : **Vanilla JS & pur CSS**."
- **Points Forts du Code :**
  - **CSS Moderne :** Utilisation massive des `CSS Variables` (`--bg-glass`, `--accent-primary`) pour un design system cohérent et facile à maintenir.
  - **Layout :** Utilisation de `CSS Grid` et `Flexbox` pour une grille responsive qui s'adapte à tous les écrans (mentionnez le travail fait sur le mobile).
  - **JavaScript Modulaire :** Une architecture propre où les données (`players.js`) sont séparées de la logique d'affichage, rendant l'ajout de nouveaux membres très simple.

### 4. Démo Live (1 min)

- _Action :_ Naviguez sur le site en parlant.
  1.  **Filtrage :** Cliquez sur "Full-Stack" puis "Data Engineer". Soulignez la fluidité de la transition ("Pas de rechargement de page").
  2.  **Profil :** Cliquez sur un profil. Montrez la cohérence visuelle avec la page d'accueil (badges, statistiques).
  3.  **Retour :** Utilisez le bouton retour pour montrer la fluidité du parcours utilisateur.

### 5. Conclusion (15 sec)

- **Synthèse :** "Au final, Class Squad n'est pas juste un annuaire, c'est une vitrine de nos compétences techniques et de notre sensibilité produit."
- **Phrase de fin :** "Merci de votre attention. Avez-vous des questions sur les choix d'architecture ou de design ?"

---

## 💡 Mots-clés à placer (Bingo Prof)

- **"User-Centric"** (Centré utilisateur)
- **"Hiérarchie visuelle"**
- **"Responsive Design"**
- **"Maintainability"** (Maintenabilité du code)
- **"Performance"** (Pas de frameworks lourds inutiles)
