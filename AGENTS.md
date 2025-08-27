# AGENTS.md

## Installation

-   Toujours commencer par `yarn install` pour installer toutes les dépendances.
-   Si vous utilisez Yarn v4.x (Berry/PnP), ajoutez ou vérifiez dans `.yarnrc.yml` :

    ```yaml
    nodeLinker: node-modules
    ```

## Scripts

Utilisez les scripts définis dans le `package.json` :

-   **`yarn dev`** : lance l’application en mode développement (`next dev`).
-   **`yarn build`** : construit la production (`next build`).
-   **`yarn start`** : démarre le serveur en production (`next start`).
-   **`yarn lint`** : exécute le lint via Next.js (`next lint`).
-   **`yarn generate:sitemap`** : génère le sitemap (`node scripts/generate-sitemap.js`).

## Style de code

-   Utiliser **Prettier** pour formater le code :

    ```bash
    yarn prettier --write .
    ```

-   Respecter les règles **ESLint** intégrées à Next.js :

    ```bash
    yarn lint
    ```

## Dépendances clés

-   **Framework** : Next.js v15.0.3
-   **Markdown** : react-markdown v10.1.0 avec remark-gfm
-   **Styles** : Sass 1.60.0
-   **AWS & Amplify** : aws-amplify 6.9.0 et @aws-amplify/ui-react

## Tests

-   Actuellement, il n’y a pas de script de test défini.
-   Si vous ajoutez des tests, créez un script `yarn test` et assurez-vous qu’il passe avant chaque PR.

## Pull Request

-   **Titre de la PR** : `[Fix|Feat] courte description`
-   **Description** : expliquer l’objectif du changement.
-   **Tests effectués** : listez les commandes exécutées (ex. `yarn dev`, `yarn lint`, `yarn build`).

---
# Menu UI — Starter tests & docs (exemples)

⚠️ Tous les fichiers sont fournis **à titre d’exemple**. Adaptez les imports, chemins et sélecteurs à votre code.

## Contenu
- `docs/audit/*`: documents d’audit à compléter.
- `docs/menu-actions-v2.md`: guide d’activation du feature flag.
- `__tests__/*`: tests Vitest (unit/intégration) — basés sur des stubs.
- `e2e/menu.spec.ts`: squelette de tests Playwright.

## Pré-requis
- Vitest + @testing-library/react installés
- (Optionnel) Playwright installé

## Scripts suggérés (package.json)
```jsonc
{
  "scripts": {
    "test": "vitest run",
    "test:ui": "vitest --ui",
    "e2e": "playwright test"
  }
}
```

## Étapes recommandées
1) Compléter les docs d’audit à partir de votre repo.
2) Créer les modules `src/menu/actions/*`, `src/menu/scroll/*` puis remplacer les stubs d’import dans les tests.
3) Activer quelques tests (retirer les stubs si vous importez le vrai code).
4) Ajouter des cas réels pour vos composants (`Header`, `Nav`, etc.).

> Ces instructions seront automatiquement suivies par Codex pour chaque tâche (lint, build, PR, etc.), garantissant un workflow cohérent et reproductible.
