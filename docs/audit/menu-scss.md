# Audit — SCSS du menu

## Sélecteurs principaux

| Sélecteur                                                          | Description                    | Profondeur de cascade                          |
| ------------------------------------------------------------------ | ------------------------------ | ---------------------------------------------- |
| `.main-nav`                                                        | conteneur des liens principaux | 1                                              |
| `.group_link-submenu`                                              | wrapper d’un item              | 2 (`.main-nav .group_link-submenu`)            |
| `.head-link`                                                       | bouton/texte du lien           | 3 (`.main-nav .group_link-submenu .head-link`) |
| `.submenu`                                                         | conteneur des sous-liens       | 3                                              |
| `.submenu.open`                                                    | sous-menu affiché              | 3                                              |
| `.head-link .nav-link`                                             | texte stylé                    | 4                                              |
| `.main-nav:hover .group_link-submenu .head-link:hover .icon-color` | profondeur maximale observée   | 5+                                             |

## Data-attributes recommandés

## Data-attributes

- `data-reduced="mobile|tablet|desktopReduced|desktop"` sur `<nav>`.
- `data-open-main`, `data-open-button`, `data-big-menu` sur `<header>`.
- `data-submenu="id"` sur `.submenu` pour cibler un sous-menu sans cascade.
- Sur le conteneur nav : `data-reduced="mobile|tablet|desktopReduced|desktop"`.
- Sur un item : synchroniser `aria-expanded` + `data-open="true|false"` si utile.

```scss
nav[data-reduced="desktopReduced"] .menu__label {
    display: none;
}
nav[data-reduced="mobile"] .menu__label {
    display: none;
}
.menu__item[aria-expanded="true"] > .menu__children {
    max-height: 999px;
}
.menu__item > .menu__children {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.25s ease;
}
```

## Tokens/offset

- Définir `--header-h` ou calculer via ref JS.
- Éviter les cascades > 3 niveaux lorsque possible.
