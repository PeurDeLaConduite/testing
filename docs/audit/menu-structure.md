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
    1. `router.push(path)`
    2. si `AnchorId` → scroll animé **depuis le haut** (offset non unifié).
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

# Audit — Structure actuelle du menu

## Arborescence de composants

- `Header`
    - `Nav`
        - `NavLinkShow`
            - `RenderLink`
            - `SubMenu`
        - `NavInput`

## États suivis

- `tabletMain` : bascule la mise en page tablette.
- `openMainButton` : force l'affichage du bouton principal.
- `openButton` : conserve les liens visibles sur grand écran.
- `bigMenu` : élargit le menu entre 1170 px et 1439 px.
- `openSubMenu` : identifiant du sous-menu actif (via `NavigationContext`).

`useResize` met à jour ces états selon la largeur de la fenêtre :

| largeur (px) | état                                                                                    | description     |
| -----------: | --------------------------------------------------------------------------------------- | --------------- |
|       < 1024 | `tabletMain = false`, `openMainButton = false`, `openButton = false`, `bigMenu = false` | mobile          |
|    1024–1169 | `tabletMain = true`, `openMainButton = true`, `openButton = false`, `bigMenu = false`   | tablette        |
|    1170–1439 | `tabletMain = true`, `openMainButton = true`, `openButton = false`, `bigMenu = true`    | desktop réduit  |
|       ≥ 1440 | `tabletMain = true`, `openMainButton = true`, `openButton = true`, `bigMenu = true`     | desktop complet |

## Flux d’événements

1. `Header` initialise les états via `useResize`.
2. `NavigationContext` fournit `openSubMenu`, `currentRoute` et `showNavLinks`.
3. Au clic sur un lien :
    - `handleNavClick` vérifie le chemin et met à jour la route.
    - si un `AnchorId` est présent, `handleScrollClick` anime le scroll et actualise `ScrollContext`.
4. `setOpenSubMenu` (issu de `NavigationContext`) ouvre/ferme les sous-menus.

## Dépendances principales

- `NavigationContext` : états de navigation partagés (`currentRoute`, `openSubMenu`, `showNavLinks`).
- `ScrollContext` : section active après scroll.
- `useResize` : gestion des seuils responsives.
