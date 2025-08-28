# peur-de-la-conduite

yarn run build

Augmenter la mémoire : npx --node-arg=--max-old-space-size=4096 next dev

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

```bash
npx create-next-app@latest
```

// eslint-disable-next-line @typescript-eslint/no-unused-vars

## Getting Started

First, run the development server:

```bash
yarn install
# or
yarn run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Tests

### Installation

```bash
yarn install
```

### Exécution

- `yarn test` : exécute l’ensemble des tests.
- `yarn test:unit` : lance uniquement les tests unitaires.
- `yarn test:api` : exécute les tests d’API.
- `yarn test:e2e` : lance les tests end-to-end.

### Mocks Amplify

Pour éviter les appels réseau lors des tests, vous pouvez simuler les services AWS Amplify :

1. Créez un dossier `__mocks__` et un fichier `aws-amplify.ts` exportant des versions factices des modules utilisés (`Auth`, `API`, etc.).
2. Dans vos fichiers de test, appelez `vi.mock('aws-amplify')` pour activer ces mocks.
