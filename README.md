# peur-de-la-conduite

## Prérequis

- Node.js **20.18.x**
- Yarn **4.x** (Berry) avec `nodeLinker: node-modules` configuré dans `.yarnrc.yml`

## Scripts principaux

- `yarn install` : installe toutes les dépendances du projet.
- `yarn dev` : lance l'application Next.js en mode développement sur `http://localhost:3000`.
- `yarn build` : génère la build de production (`next build`).
- `yarn type-check` : vérifie les types TypeScript sans générer de fichiers.
- `yarn test` : exécute l'ensemble des tests Vitest.
- `yarn test:unit` : lance uniquement les tests unitaires.
- `yarn test:api` : exécute les tests d'API avec couverture.
- `yarn test:e2e` : lance les tests end-to-end avec Playwright.

## Workflow CI GitHub

Le workflow [CI](.github/workflows/ci.yml) se déclenche sur chaque `push` ou `pull_request` vers `main`.
Il s'exécute sur **Node.js 20** et utilise Yarn pour :

1. `yarn install --immutable`
2. `yarn lint`
3. `yarn type-check`
4. `yarn build`
5. `yarn test:all`

Ce processus garantit que le projet se construit correctement et que toutes les suites de tests passent avant intégration.

## Tests

- `yarn format` : formate l’ensemble du projet avec Prettier.
- Les services AWS Amplify peuvent être simulés via un dossier `__mocks__` et la fonction `vi.mock('aws-amplify')`.
