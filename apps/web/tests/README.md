# Tests de l'application `web`

Ce dossier centralise tous les tests relatifs à l'app `apps/web`.

## Structure

```
apps/web/tests/
├── unit/      # tests de composants et utilitaires spécifiques à l'app
├── api/       # tests server-side (use-cases)
├── e2e/       # tests Playwright
└── _legacy/   # anciens tests en attente de tri
```

## Lancer les tests

```bash
yarn test:unit    # tests unitaires (Vitest + RTL)
yarn test:api     # tests de logique server-side
yarn test:e2e     # tests end-to-end Playwright
```

## Ajouter un test

1. Placer le fichier sous le dossier approprié (`unit`, `api` ou `e2e`).
2. Respecter les conventions `*.test.ts` / `*.test.tsx`.
3. Utiliser les alias TypeScript (`@packages/ui/*`, `@packages/services/app/*`, etc.).
4. Les tests unitaires doivent mocker Amplify :
    ```ts
    vi.mock("aws-amplify", () => ({ Auth: { signIn: vi.fn() } }));
    ```

## Mocks d'Amplify

Le fichier `setupTests.ts` fournit des mocks basiques pour `aws-amplify` et `@aws-amplify/ui-react`.  
Adapter au besoin dans les tests spécifiques.
