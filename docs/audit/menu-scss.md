⚠️ **Note** — Exemples SCSS fournis à titre indicatif. Ne cassez pas vos classes existantes.

# 🎨 SCSS — Ajouts non intrusifs

## Data-attributes
- Sur le conteneur nav : `data-reduced="mobile|tablet|desktopReduced|desktop"`.
- Sur un item : synchroniser `aria-expanded` + `data-open="true|false"` si utile.

```scss
nav[data-reduced="desktopReduced"] .menu__label { display: none; }
nav[data-reduced="mobile"]         .menu__label { display: none; }
.menu__item[aria-expanded="true"] > .menu__children { max-height: 999px; }
.menu__item > .menu__children { max-height: 0; overflow: hidden; transition: max-height .25s ease; }
```

## Tokens/offset
- Définir `--header-h` ou calculer via ref JS.
- Éviter les cascades > 3 niveaux lorsque possible.
