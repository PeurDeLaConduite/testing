# 🗺️ Mapping définitif des actions (MenuItem → MenuAction)

| subItems | handler externe | path | AnchorId | Action attendue                  | Remarques |
|---------:|----------------:|-----:|---------:|----------------------------------|----------|
| oui      | n/a             | n/a  | n/a      | `toggle`                         | ouvre/ferme sous-menu |
| non      | oui             |  *   |   *      | `externalClick`                  | `externalActions[id]` |
| non      | non             | oui  | oui      | `href` → `/page#ancre`           | scroll après navigation |
| non      | non             | non  | oui      | `hash` → `scrollToId(ancre)`     | scroll in-page |
| non      | non             | oui  | non      | `href`                           | navigation simple |
| non      | non             | non  | non      | `toggle` (fallback)              | no-op possible |

> Vérifiez chaque item de `menuItems.ts` et rattachez-le à une ligne de ce tableau.
