⚠️ **Note** — Document à valider avant implémentation.

# ❓ Audit — Menu : questions ouvertes

## 1) États finaux du réducteur

| état             | largeur (px) | déclencheur cible               |
| ---------------- | -----------: | ------------------------------- |
| `mobile`         |        <1024 | navigation réduite              |
| `tablet`         |    1024–1169 | apparition du bouton principal  |
| `desktopReduced` |    1170–1439 | menu élargi sans tous les liens |
| `desktop`        |        ≥1440 | menu complet                    |

> Confirmer les valeurs exactes et les seuils de transition.

## 2) Source de l’offset

- `headerRef.current?.offsetHeight` (valeur runtime).
- variable CSS `--header-h` synchronisée.
- Besoin d’une fonction unique `getOffset()` pour le service de scroll.

## 3) Items sans `path` / `AnchorId` / `subItems`

- Traitement par défaut : `toggle` (aucune navigation).
- Envisager un log d’avertissement pour audit.
- Vérifier que ces items sont documentés dans `menuItems.ts`.
