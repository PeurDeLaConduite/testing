⚠️ **Note** — Le code est fourni à titre d’exemple. Complétez-le selon besoins réel.

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

#  Audit — Réponses claires

# 🔒 Spécification unifiée — Menu (réducteur & comportements)

## 1) États finaux du réducteur (modes d’affichage)

> 📌 À valider : seuils exacts & redirection `<768px`.

| état             | largeur (px) | déclencheur cible               | comportement (résumé)                                                                                                                                                                                                                                                          |
| ---------------- | -----------: | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `mobile`         |     `< 1024` | navigation réduite              | **Toutes les nav réduites** (icône seule). **Un seul label visible** à la fois (hover/focus). **Si `<768`** : **redirection** vers l’URL mobile.                                                                                                                               |
| `tablet`         |  `1024–1169` | apparition du menu principal    | **Menu principal ouvert par défaut** (icône + label). Nav secondaires **réduites**. Sur hover/focus d’un **bouton réduit** : principal **se réduit temporairement** et **seul** le label ciblé s’affiche. Revenir sur le principal → **ré-élargi** + tous ses labels visibles. |
| `desktopReduced` |  `1170–1439` | menu élargi sans tous les liens | **Principal élargi** (labels visibles). Nav secondaires **icône seule**. Sur hover/focus d’un bouton réduit : **son label apparaît**, **un seul à la fois**.                                                                                                                   |
| `desktop`        |     `≥ 1440` | menu complet                    | **Tous les liens** (icône + label) visibles, **aucune** réduction contextuelle.                                                                                                                                                                                                |

**Règles transversales**

* `hover ≡ focus` (clavier et souris même effet).
* Changement de breakpoint → **réinitialiser** ouvertures contextuelles.
* Debounce `resize` \~100–150 ms.

---

## 2) Détails par mode (mobile & tablet)

### A) Mobile — `<1024px` (dont redirection `<768px`)

**Principes**

* Toutes les nav (principal + secondaires) **réduites** (icône seule).
* **Un seul label visible** à la fois (hover/focus) ; passage d’un item à l’autre = **switch immédiat**.
* `<768px` : **redirection** vers l’URL mobile (une fois par session).

**Critères d’acceptation**

* Hover/focus d’un item de **n’importe quelle nav** → **son** label s’affiche ; **tous les autres** labels sont cachés.
* Changer d’item → le label précédent se **referme** instantanément.
* Blur/mouseleave → **aucun** label persistant.
* Au chargement ou après `resize`, si `innerWidth < 768`, **redirection** (sans boucle).

### B) Tablet — `1024–1169px`

**Intention produit**

* **Menu principal ouvert par défaut** (icône + label).
* Nav secondaires **réduites** (icône seule).
* Ciblage d’un **bouton réduit** (nav secondaire) → **principal réduit temporairement** et **un seul label flottant** (celui de l’item ciblé).
* Revenir sur le **menu principal** → principal **ré-élargi** + **tous** ses labels visibles.

**Règles**

1. **État initial** : `main = expanded`, `others = reduced`.
2. **Item réduit (nav secondaire)** : `main → reduced` temporairement, `activeLabelId = itemId`, **un seul** label visible.
3. **Sortie de l’item réduit** : `main → expanded`, `activeLabelId = null`.
4. **Zone du menu principal** : `hover/focus` → `main → expanded`, **tous** les labels du principal visibles.

**Critères d’acceptation**

* Par défaut : principal **icône + label** ; secondaires **icône seule**.
* Hover/focus item réduit : principal **réduit**, **seul** le label ciblé visible.
* Sortie : principal **ré-élargi**, **tous** ses labels reviennent.
* Hors “principal ouvert”, il n’y a **qu’un seul label** affiché.

### C) DesktopReduced — **1170–1439px**

**Intention produit**

* **Menu principal** toujours **ouvert** (icône + label).
* **Nav secondaires** **réduites** (icône seule).
* **Un seul label “flottant”** peut être affiché dans les secondaires à la fois (switch immédiat).

**Règles**

1. **État initial**

   * `main = expanded` (tous les labels du principal visibles).
   * `others = reduced` (icône seule).
   * `activeLabelId = null`.

2. **Interaction nav secondaire (item réduit)**

   * `hover/focus` d’un item secondaire → `activeLabelId = itemId`.
   * Si un autre item secondaire est `hover/focus`, l’ancien **se ferme** et le nouveau **s’ouvre** (switch).

3. **Interaction menu principal**

   * `hover/focus` sur la **zone du menu principal** → principal **reste expanded**.
   * **Aucun** label flottant secondaire ne doit rester ouvert : `activeLabelId = null`.

4. **Sorties**

   * `blur/mouseleave` d’un item secondaire → `activeLabelId = null`.
   * Le principal **ne se réduit jamais** en DesktopReduced.

**Critères d’acceptation**

* À 1280px : **labels du principal visibles**, secondaires **icône seule**.
* `hover/focus` secondaire “B” → le **label de B** s’affiche, **tous les autres** labels secondaires sont cachés.
* Passer sur “C” → **B se ferme**, **C s’ouvre** (switch).
* `hover/focus` sur le principal → **tous les labels secondaires se ferment** ; principal inchangé (labels visibles).
* Aucun label flottant ne persiste après `blur/mouseleave`.

---

### D) Desktop — **≥ 1440px**

**Intention produit**

* **Menu complet** partout : **toutes** les nav (principal + secondaires) affichent **icône + label** **en permanence**.
* Aucune logique de réduction, aucun label flottant.

**Règles**

1. **État global**

   * `main = expanded`.
   * `others = expanded`.
   * `activeLabelId = null` (non utilisé).

2. **Interactions**

   * `hover/focus` n’affecte **pas** la visibilité des labels (uniquement styles d’état/aria).
   * Les événements “ENTER/LEAVE\_REDUCED\_ITEM” sont **sans effet** en Desktop.

3. **Transitions**

   * Passage de `desktopReduced → desktop` (≥1440) : **tous** les labels secondaires deviennent **visibles**, `activeLabelId` est **remis à null**.
   * Passage inverse (`desktop → desktopReduced`) : principal **reste expanded**, secondaires **redeviennent réduites**, `activeLabelId = null`.

**Critères d’acceptation**

* À 1600px : **tous** les items (principal + secondaires) affichent **icône + label** en permanence.
* Changer d’item, `hover/focus`, `blur` : **aucun** label ne s’ouvre/se ferme, seuls les styles d’état changent.
* Redescendre à 1400px : principal **labels visibles**, secondaires **icône seule** (retour au comportement DesktopReduced).

---

### Rappels transversaux (DesktopReduced & Desktop)

* **hover ≡ focus** (clavier/souris même effet).
* **Changement de breakpoint** → réinitialiser les ouvertures contextuelles (`activeLabelId = null`).
* Debounce `resize` \~100–150 ms pour éviter le jitter.


---

## 3) Navigation par ancre & offset (service)

* Source d’offset : `headerRef.current?.offsetHeight` (runtime) puis `--header-h` (CSS) ; fallback constant (ex. 80).
* Fonction unique `getOffset()` appliquée **à chaque scroll ancre**.

**Scénario (Gherkin)**

```
Fonctionnalité: Navigation par ancre
  Scénario: Item avec path + AnchorId
    Étant donné que je suis sur la page d’accueil
    Quand je clique sur "Services" avec l’ancre "#tarifs"
    Alors l’URL devient "/services#top"
    Et après le changement, on remplace l’ancre par "#tarifs"
    Alors la page défile vers l’élément d’id "tarifs"
    Et le défilement applique l’offset retourné par getOffset()
```

---

## 4) Machine d’états — minimale & complète (TS)

```ts
// breakpoints.ts
export const BP = { mobile: 1024, tabletMax: 1169, desktopReducedMax: 1439 } as const;

export function computeMode(w: number): 'mobile'|'tablet'|'desktopReduced'|'desktop' {
  if (w < BP.mobile) return 'mobile';
  if (w <= BP.tabletMax) return 'tablet';
  if (w <= BP.desktopReducedMax) return 'desktopReduced';
  return 'desktop';
}

// types.ts
export type Mode = 'mobile'|'tablet'|'desktopReduced'|'desktop';
export type MainMenu = 'expanded'|'reduced';

export interface UIState {
  mode: Mode;
  main: MainMenu;            // état du menu principal
  activeLabelId: string|null; // label "flottant" (secondaires / mobile)
}

export type Event =
  | { type: 'BREAKPOINT'; w: number }
  | { type: 'ENTER_MAIN' }              // hover/focus zone menu principal
  | { type: 'LEAVE_MAIN' }
  | { type: 'ENTER_REDUCED_ITEM'; id: string } // item réduit (nav secondaire ou mobile)
  | { type: 'LEAVE_REDUCED_ITEM'; id: string }
  | { type: 'RESET' };

// reducer.ts
export function getDefaultMain(mode: Mode): MainMenu {
  if (mode === 'tablet' || mode === 'desktop' || mode === 'desktopReduced') return 'expanded';
  return 'reduced'; // mobile
}

export function reducer(s: UIState, e: Event): UIState {
  switch (e.type) {
    case 'BREAKPOINT': {
      const mode = computeMode(e.w);
      return { mode, main: getDefaultMain(mode), activeLabelId: null };
    }

    case 'ENTER_MAIN': {
      // principal toujours expanded en tablet/desktop/desktopReduced
      if (s.mode === 'mobile') return s; 
      return { ...s, main: 'expanded', activeLabelId: null };
    }

    case 'LEAVE_MAIN': {
      // tablet: reste expanded par défaut ; desktopReduced/desktop idem
      return s;
    }

    case 'ENTER_REDUCED_ITEM': {
      if (s.mode === 'tablet') {
        // réduire temporairement le principal, afficher un seul label flottant
        return { ...s, main: 'reduced', activeLabelId: e.id };
      }
      if (s.mode === 'mobile') {
        // un seul label visible à la fois
        return { ...s, activeLabelId: e.id };
      }
      if (s.mode === 'desktopReduced') {
        // principal reste expanded ; un seul label flottant côté secondaires
        return { ...s, activeLabelId: e.id };
      }
      // desktop: pas de label flottant
      return s;
    }

    case 'LEAVE_REDUCED_ITEM': {
      if (s.mode === 'tablet') {
        return { ...s, main: 'expanded', activeLabelId: null };
      }
      if (s.mode === 'mobile' || s.mode === 'desktopReduced') {
        return { ...s, activeLabelId: null };
      }
      return s;
    }

    case 'RESET':
      return { mode: s.mode, main: getDefaultMain(s.mode), activeLabelId: null };

    default:
      return s;
  }
}

// selectors.ts
export function shouldShowLabel(
  s: UIState,
  { isMain, itemId }: { isMain: boolean; itemId: string }
): boolean {
  if (s.mode === 'desktop') return true;

  if (s.mode === 'tablet') {
    if (isMain) return s.main === 'expanded';
    // secondaires : label visible si item actif
    return s.activeLabelId === itemId && s.main === 'reduced';
  }

  if (s.mode === 'desktopReduced') {
    if (isMain) return true; // principal toujours label
    return s.activeLabelId === itemId; // un seul flottant
  }

  // mobile
  return s.activeLabelId === itemId;
}
```

---

## 5) Hooks d’intégration (redirection & contrôleur UI)

```ts
// useMobileRedirect.ts
import { useEffect } from 'react';

export function useMobileRedirect(targetHost: string) {
  useEffect(() => {
    try {
      if (window.innerWidth < 768 && location.hostname !== targetHost) {
        if (!sessionStorage.getItem('mobile-redirect')) {
          sessionStorage.setItem('mobile-redirect', '1');
          const url = new URL(location.href);
          url.hostname = targetHost; // ex: mobile.exemple.com
          location.replace(url.toString());
        }
      }
    } catch {}
  }, []);
}
```

```ts
// useMenuController.ts
import { useEffect, useReducer } from 'react';
import { reducer } from './reducer';
import { computeMode, getDefaultMain } from './reducer';

export function useMenuController() {
  const [state, dispatch] = useReducer(reducer, {
    mode: computeMode(typeof window === 'undefined' ? 1440 : window.innerWidth),
    main: getDefaultMain(computeMode(typeof window === 'undefined' ? 1440 : window.innerWidth)),
    activeLabelId: null
  });

  useEffect(() => {
    let t: number | null = null;
    const onResize = () => {
      if (t) cancelAnimationFrame(t);
      t = requestAnimationFrame(() => dispatch({ type: 'BREAKPOINT', w: window.innerWidth }));
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Handlers normalisés
  const enterMain = () => dispatch({ type: 'ENTER_MAIN' });
  const leaveMain = () => dispatch({ type: 'LEAVE_MAIN' });
  const enterReduced = (id: string) => dispatch({ type: 'ENTER_REDUCED_ITEM', id });
  const leaveReduced = (id: string) => dispatch({ type: 'LEAVE_REDUCED_ITEM', id });
  const reset = () => dispatch({ type: 'RESET' });

  return { state, enterMain, leaveMain, enterReduced, leaveReduced, reset };
}
```

---

## 6) Tests (Gherkin — extraits)

**Mobile — un seul label**

```
Scénario: Un seul label visible en mobile
  Étant donné un viewport de 800px
  Et toutes les nav réduites
  Quand je focus l’item "A"
  Alors le label "A" est visible
  Et tous les autres labels sont cachés
  Quand je focus l’item "B"
  Alors le label "A" est caché
  Et le label "B" est visible
```

**Tablet — réduction temporaire du principal**

```
Scénario: Hover d’un item réduit en tablet
  Étant donné un viewport de 1100px
  Et le menu principal expanded
  Quand je hover l’item réduit "X" (nav secondaire)
  Alors le menu principal passe en reduced
  Et seul le label de "X" est visible
  Quand je quitte "X"
  Alors le menu principal revient en expanded
  Et tous ses labels réapparaissent
```

**DesktopReduced — un seul label flottant côté secondaires**

```
Scénario: Un seul label flottant en desktopReduced
  Étant donné un viewport de 1300px
  Et le menu principal expanded
  Quand je hover "S1" (nav secondaire)
  Alors seul le label de "S1" est visible
  Quand je hover "S2"
  Alors le label de "S1" est caché
  Et seul le label de "S2" est visible
```

---

## 7) Accessibilité (rappel)

* `hover ≡ focus` ; `aria-expanded`, `aria-controls`, `aria-label` pour les toggles.
* `Escape` ferme un label/tooltip ouvert.
* Restauration du focus après redirection/scroll.

---
Parfait—voici la **spécification unifiée “défilement en 2 temps”** (compatible avec ton archi actuelle, **sans toucher à tes offsets par ID**).

---

# 🔒 Spécification — Navigation par ancre en **2 temps** (cross-page)

## 0) Contexte & objectif

* **Problème** : `push('/services#tarifs')` fait arriver **directement** sur l’ancre → **0 scroll** (pas d’animation).
* **Objectif** : garantir un **scroll animé depuis le haut** en cas de **changement de page**, tout en conservant le **scroll direct** (1 temps) **sur la même page**.
* **Nota** : les **offsets sont déjà gérés par ID** chez toi → on **n’y touche pas**.

---

## 1) Termes & invariants

* `path` : route cible (ex. `/services`).
* `anchor` : identifiant d’élément (ex. `#tarifs`).
* `#top` : **sentinelle** (existe dans le layout via `body#top`) pour forcer le départ en haut.
* `sections` (déjà présent) inclut **au minimum** : `top`, `slider`, `about`, `services`, `contact`, `sans-permis`, `avec-permis`.
* Le **scroll programmatique** utilise **ta** fonction (ex. `handleScrollClick(id)`).

---

## 2) Règles fonctionnelles

### 2.1 Clic sur un lien **même page**

* Si `currentPath === targetPath` :

  * S’il y a `anchor` : **scroll direct** vers `anchor` (1 temps).
  * SANS `anchor` : scroll vers `top`.

### 2.2 Clic sur un lien **autre page** (2 temps)

1. **Temps 1** : naviguer vers `targetPath#top` (départ commun en haut).
2. **Temps 2** (sur la page cible) : scroller **depuis `#top`** vers `anchor`, avec **offset par ID** (ta logique).
3. **Nettoyage URL** : remplacer l’URL par `targetPath#anchor` (sans empiler l’historique inutilement).

### 2.3 Re-clic sur la **même ancre**

* Sur même page : relancer le **scroll** (même si l’URL a déjà `#anchor`).

### 2.4 Cas sans `anchor`

* **Même page** : scroll vers `top`.
* **Autre page** : `targetPath#top` uniquement (pas de Temps 2).

---

## 3) États & événements (vue minimale)

**State**

* `pendingAnchor: string | null` — ancre à traiter après changement de page.
* `isCrossPage: boolean` — `currentPath !== targetPath`.

**Events**

* `CLICK(path, anchor?)`
* `NAVIGATED_TO_TOP` (page cible montée avec `#top`)
* `DOM_READY` (petit délai/RAF pour stabilité layout)
* `SCROLLED(id)` (exécuté via ta fonction)
* `URL_REPLACED(path#anchor)`

**Transitions (résumé)**

* `CLICK` (autre page + anchor) → `pendingAnchor = anchor`, navigate `path#top`.
* `NAVIGATED_TO_TOP` → `DOM_READY` → `SCROLLED(pendingAnchor)` → `URL_REPLACED`.

---

## 4) Contrats d’intégration (avec ton code)

* **Départ du clic** (dans ton menu)

  * Si autre page + `anchor` : **mémoriser** l’ancre (ex. `sessionStorage.setItem('target-anchor', anchor)`) puis `updateRoute(`\${path}#top`)`.
  * Si même page : appeler **directement** `handleScrollClick(anchor || 'top')`.

* **À l’arrivée page cible** (ex. dans `useInitialScroll(pathname)` ou un hook dédié)

  * Lire `sessionStorage.getItem('target-anchor')`.
  * Si présent → `requestAnimationFrame(() => handleScrollClick(pending))`, puis `history.replaceState(null, "", `\${location.pathname}#\${pending}`)` et **clear** la clé.
  * Si `window.location.hash` est déjà `#tarifs` (reload) → `handleScrollClick('tarifs')`.

* **Important** : en **toutes circonstances**, quand tu scrolles **sans `anchor`**, utilise bien **`'top'`** (et pas `'scroll-start'`).

---

## 5) Critères d’acceptation (Gherkin)

**Cross-page (2 temps)**

```
Fonctionnalité: Défilement cross-page en 2 temps
  Scénario: Cliquer sur "Services#tarifs" depuis l'accueil
    Étant donné que je suis sur "/"
    Quand je clique sur l’item "Services" avec l’ancre "#tarifs"
    Alors l’URL devient "/services#top"
    Et après rendu, la page défile jusqu’à "tarifs" avec l’offset spécifique
    Et l’URL est remplacée par "/services#tarifs"
```

**Même page (1 temps)**

```
Scénario: Cliquer sur une ancre de la même page
  Étant donné que je suis sur "/services"
  Quand je clique sur "Tarifs" (#tarifs)
  Alors la page défile jusqu’à "tarifs" avec l’offset spécifique
  Et l’URL reste "/services#tarifs"
```

**Re-clic même ancre**

```
Scénario: Relancer le scroll sur la même ancre
  Étant donné que je suis sur "/services#tarifs"
  Quand je re-clique sur "Tarifs"
  Alors le scroll vers "tarifs" est relancé (animation visible)
```

**Sans ancre**

```
Scénario: Lien sans ancre
  Étant donné que je suis sur "/"
  Quand je clique sur "Services" (sans ancre)
  Alors l’URL devient "/services#top"
  Et la page reste ancrée en haut
```

**Ancre inconnue**

```
Scénario: Ancre inconnue
  Étant donné que je suis sur "/"
  Quand je clique sur "/services#inconnu"
  Alors le scroll n'a pas lieu
  Et un log warn "anchor not found: inconnu" est émis
```

---

## 6) Contraintes techniques

* **Stabilité du layout** : déclencher le scroll après **au moins 1 `requestAnimationFrame`** (2 si contenus dynamiques) pour laisser le header sticky/fonts se poser.
* **Historique** : utiliser `history.replaceState` pour éviter **2 entrées** (Temps 1 + Temps 2).
* **Accessibilité** : après scroll, `focus()` l’élément cible (mettre `tabIndex="-1"` si nécessaire, `preventScroll: true`).
* **SSR/Hydratation** : ne jamais lire `window` pendant le **render**. Tout accès au DOM se fait dans des **effects**.
* **Écoute globale** (optionnel mais robuste) : un `useHashScroll()` (déjà présent chez toi) pour re-scroller si l’utilisateur change le hash manuellement ou via Back/Forward.

---

## 7) Logs & erreurs

* **Warn** si ID manquant : `console.warn('[anchor] not found:', id)`.
* **Trace** (optionnel) : `console.debug('[anchor] 2-steps', { path, anchor })` pour faciliter le debug.

---

## 8) Check rapide (do/don’t)

**Do**

* `sections` contient **"top"** (✅ c’est le cas).
* `elseNav` utilise **"top"** (remplace `"scroll-start"` si présent).
* `currentRoute` est initialisé via `usePathname()` (pas `window` en render).
* `useInitialScroll(pathname)` gère **hash courant** ET **pending anchor** (storage).

**Don’t**

* Pas de `push('/services#tarifs')` en cross-page (sinon 0 scroll).
* Pas d’accès DOM avant hydratation.

---

### TL;DR

* **Même page** : scroll **direct** vers l’ID (1 temps).
* **Autre page** : `target#top` → **scroll programmatique** vers l’ID (2 temps) → **replaceState** vers `#id`.
* **Offsets par ID** : inchangés (tu gardes ta logique).
* **Robustesse** : RAF, replaceState, warn si ID inconnu, hash handler global en option.


# ❓ Questions ouvertes — Menu

Document temporaire consignant les zones d'ombre sur le fonctionnement du menu.
Mettre à jour au fil des clarifications.

## États du menu

* [x] **Quelles sont les valeurs exactes des états possibles (`closed`, `opening`, `open`, etc.) ?**
  `openSubMenu: string | null`, `showNavLinks: boolean`, `currentRoute: string`, `openMainButton: boolean`, `openButton: boolean`, `bigMenu: boolean`, `tabletMain: boolean`, `openMenu: string | null`.

* [x] **Comment ces états sont-ils stockés ou exposés (booléen, énumération, machine à états...) ?**
  Booléens et chaînes via `useState`, exposés soit par le **NavigationContext** (route, sous-menu, visibilités), soit comme **états locaux** dans `Header` / `Nav`.

### Transitions (résumé)

* Clic sur un item → `setOpenSubMenu(openSubMenu === id ? null : id)`.
* Clic/survol extérieur → fermeture via logique `useMenuBehavior` (ou équivalent).
* Clic sur un sous-lien → `setOpenSubMenu(null)`.
* Toggle labels → `setShowNavLinks(true|false)`.
* Redimensionnement → ajuste `tabletMain`, `openMainButton`, `openButton`, `bigMenu`.
* Survol/hors-survol principal → `handleMainMouseOrFocus` modifie `openMainButton`.

### Props / sélecteurs exposés

* `showNavLinks` propagé à `NavLinkShow` et `NavInput`.
* `openMainButton` / `openButton` pilotent les rendus conditionnels dans `NavLinkShow`.
* Calcul local `shouldShowNavLinks(menuId)` pour l’affichage par entrée.

---

## Source de l’offset

* [x] **Quelle est l'origine de l'offset appliqué au scroll (`ref` du header, variable CSS `--header-h`, calcul dynamique...) ?**
  **Paramètre `offset`** transmis à `scrollToId` (par défaut **`0`**). Pas de variable CSS dédiée détectée.

* [x] **L'offset est-il unifié entre desktop et mobile ?**
  **Oui (dans l’état actuel)** : aucune branche spécifique, l’offset reste **0** quel que soit l’appareil.

### Calcul & application

* Calcul : `const top = el.getBoundingClientRect().top + window.scrollY - offset`.
* Application : navigation par hash → `scrollToId(targetId)` ; `useHashScroll(offset)` délègue à `scrollToId`.

### Spécificités ancres / navigation

* `handleNavClick` gère `path#hash` et déclenche `handleScrollClick` si on reste sur la même page.
* Les `menuItems` utilisent `AnchorId: "#top"` pour forcer un scroll depuis le haut.

---

## Comportements non confirmés

* [x] **Interaction de l'offset avec la navigation par hash.**
  **Confirmé** : si `useHashScroll(offset)` est actif, l’offset est pris en compte (soustrait lors du scroll). Sans ce hook, le comportement d’ancre natif ne compense **pas** l’offset.

* [x] **Défilement lors de l'ouverture simultanée de sous-menus.**
  **Non concerné** : l’ouverture/fermeture des sous-menus **ne déclenche pas** de scroll programmatique (décorrélé du système de scroll).

* [x] **Priorité entre plusieurs sources d'offset lorsqu'elles sont définies.**
  **Sans objet** : une **seule source** d’offset (paramètre de `scrollToId`). Aucune surcharge CSS (`scroll-margin-top`, `--header-h`) détectée à ce stade. Si d’autres sources sont ajoutées, définir un ordre de priorité (ex. `param` > CSS var > fallback 0).

