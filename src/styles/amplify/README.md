# Styles Amplify Authenticator

Ce dossier regroupe les styles nécessaires à l'authentification basée sur AWS Amplify.

## Variables

`_auth.variables.scss` centralise les tokens CSS extraits du thème Amplify (Button, FieldControl, Authenticator). Elles permettent d'adapter les couleurs, espacements et rayons utilisés par le composant.

## Mixins

`_auth.mixins.scss` propose des mixins `auth-button` et `auth-input` afin de répliquer rapidement l'apparence par défaut tout en facilitant les overrides.

## Tailles

`_auth.form.scss` contient les déclinaisons `--small` et `--large` utilisées par les champs de formulaire.

Ajoutez vos personnalisations dans `_auth.overrides.scss`.
