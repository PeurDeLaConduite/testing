# Plan de refactorisation

## Checklist d'exécution

1) `git checkout -b refactor/architecture`
2) `bash scripts/refactor-architecture.sh`
3) `node scripts/codemod-rewrite-imports.ts`
4) `yarn install`
5) `yarn -r build && yarn -r typecheck`
6) `yarn lint && yarn depcruise .`
7) `yarn test`
8) lancer app: `yarn workspace web dev`
9) corriger cas limites si build/lint cassent
10) ouvrir PR
