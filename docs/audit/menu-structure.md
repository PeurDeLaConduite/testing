⚠️ **Note** — Ce document est fourni **à titre d’exemple**. Adaptez-le à votre projet réel.

# 📘 Audit — Structure actuelle du menu (synthèse initiale)

## 1) Données source
- `menuItems.ts` avec types `MenuLinks`, `MenuItem` (`id`, `title`, `class`, `path`, `AnchorId`, `svg`, `subItems`).
- Contrainte : **ne pas renommer** `AnchorId` ni `subItems`.

## 2) Composants identifiés
- `Header.tsx`, `Nav.tsx`, `NavLinkShow.tsx`, `RenderLink.tsx`, `SubMenu.tsx`, `NavInput.tsx`.

## 3) Contexts / Utils
- `NavigationContext.tsx` (états: `currentRoute`, `openSubMenu`, `showNavLinks`).
- `updateMenuUtils.ts` (gestion de classes / clics externes).
- `scrollUtils.ts` + `fnScrollUtils.ts` (scroll personnalisé).
- `useResize.ts` (breakpoints & réduction).

## 4) États & modes
- États dispersés: `openSubMenu`, `showNavLinks`, `openMainButton`, `openButton`, `bigMenu`.
- `useResize` → 4 modes:
  - `<1024`: mobile (menu réduit),
  - `1024–1170`: tablette,
  - `1170–1440`: desktop réduit,
  - `≥1440`: desktop complet.

## 5) Navigation & scroll
- Clic:
  1) `router.push(path)`
  2) si `AnchorId` → scroll animé **depuis le haut** (offset non unifié).
- ⚠ Offset header sticky **non** centralisé/dynamique.

## 6) Accessibilité
- Présents: `role="menuitem"`, `aria-label` ponctuels.
- Manques: `aria-expanded`, `aria-controls`, gestion focus clavier, touche `Escape`.

## 7) SCSS
- Styles dans `_header.scss` (cascade profonde).
- Aucun `data-*` pour distinguer les modes → difficile d'ajouter sans réécrire.

---

## 📌 Décisions d’architecture (cible)
- **Feature flag**: `NEXT_PUBLIC_MENU_ACTIONS_V2`.
- **Action System**: mapping `MenuItem` → `MenuAction` (`toggle|href|hash|externalClick`).
- **Scroll service**: `scrollToId(id, offset)` + `useHashScroll(getOffset)`.
- **Réducteur**: appliquer `data-reduced="mobile|tablet|desktopReduced|desktop"` sur `<nav>`.
- **A11y**: `aria-*` & clavier complet.

## Points ouverts (à compléter en audit)
- Valeurs **réelles** du réducteur (labels + déclencheurs).
- Source unique de l’offset (`ref` header vs CSS var `--header-h`).
- Cas MenuItem sans `path|AnchorId|subItems`.
