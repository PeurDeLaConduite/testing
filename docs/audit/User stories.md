Fonctionnalité: Navigation par ancre
Scénario: Cliquer sur un item avec path + AnchorId
Étant donné que je suis sur la page d’accueil
Quand je clique sur l’item "Services" avec l’ancre "#tarifs"
Alors la route devient "/services#top"
Puis pour géré le scroll on passe de /services#top à /services#tarifs
La page défile depuis le haut (#top) jusqu’à l’élément d’id (#tarifs) "tarifs"

Fonctionnalité: Menu réactif
Scénario: Affichage réduit sur mobile
Étant donné une fenêtre de largeur 400px
Quand le menu est rendu
Alors seuls les icônes sont visibles
Et chaque item possède un attribut title pour l’accessibilité

Fonctionnalité: Actions unifiées
Scénario: Flag activé
Étant donné `NEXT_PUBLIC_MENU_ACTIONS_V2=true`
Quand je clique sur un item sans `path`
Alors l’adaptateur renvoie `{ kind: 'toggle' }`
Et aucun changement de route n’est effectué
