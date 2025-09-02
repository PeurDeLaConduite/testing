⚠️ **Note** — Document d’explication **exemple** pour la mise en place du flag.

# Menu Actions V2 — Guide d’intégration (UI only)

## Feature flag

- `NEXT_PUBLIC_MENU_ACTIONS_V2=false` par défaut (aucun changement).
- Lorsqu’activé, `NavLinkShow/RenderLink` utilisent `toAction()` + `dispatchAction()`.

## Étapes

1. Ajouter modules `src/menu/actions/*`, `src/menu/scroll/*`.
2. Brancher `useHashScroll(getHeaderOffset)` (layout ou `Header.tsx`).
3. Appliquer `data-reduced` sur `<nav>` selon `useResize` (mêmes seuils).
4. Compléter `aria-*` et clavier.
5. Activer le flag et exécuter tests (unit/int/E2E).

## Scripts (suggestion)

```jsonc
{
    "scripts": {
        "test": "vitest run",
        "test:ui": "vitest --ui",
        "e2e": "playwright test",
    },
}
```
