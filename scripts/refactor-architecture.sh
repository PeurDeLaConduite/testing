#!/usr/bin/env bash
set -euxo pipefail

# Creation des repertoires cibles
mkdir -p packages/types/src
mkdir -p packages/domain/src
mkdir -p packages/services/src/app
mkdir -p packages/services/src/adapters
mkdir -p packages/ui/src

# ----- UI -----
# Composants, contexts, hooks React, styles, icones...
git mv apps/web/src/components packages/ui/src/components
git mv apps/web/src/context packages/ui/src/context
git mv apps/web/src/auth packages/ui/src/auth
git mv apps/web/src/assets packages/ui/src/assets
git mv apps/web/src/home packages/ui/src/home
# i18n (sans types)
git mv apps/web/src/i18n packages/ui/src/i18n
# Hooks Amplify d'UI
git mv apps/web/src/amplify/useAmplifyReady.ts packages/ui/src/amplify/useAmplifyReady.ts

# ----- Types -----
mkdir -p packages/types/src/i18n
mkdir -p packages/types/src/amplify
mkdir -p packages/types/src/entities
git mv packages/ui/src/i18n/types.ts packages/types/src/i18n/types.ts
git mv apps/web/src/amplify/global.d.ts packages/types/src/amplify/global.d.ts
# Types generaux
git mv apps/web/src/types packages/types/src/app
# Types des entites
for file in apps/web/src/entities/core/types/*; do
  git mv "$file" packages/types/src/entities/core/$(basename "$file")
done
for dir in author comment post section tag todo userName userProfile; do
  mkdir -p packages/types/src/entities/models/$dir
  git mv apps/web/src/entities/models/$dir/types.ts packages/types/src/entities/models/$dir/types.ts
done
for dir in postTag sectionPost; do
  mkdir -p packages/types/src/entities/relations/$dir
  git mv apps/web/src/entities/relations/$dir/types.ts packages/types/src/entities/relations/$dir/types.ts
done

# ----- Domain -----
mkdir -p packages/domain/src/entities/core/utils
mkdir -p packages/domain/src/entities/core
git mv packages/ui/src/utils/validationForm.js packages/domain/src/validationForm.ts
git mv apps/web/src/entities/core/utils packages/domain/src/entities/core/utils
git mv apps/web/src/entities/core/auth.ts packages/domain/src/entities/core/auth.ts
for dir in author comment post section tag todo userName userProfile; do
  mkdir -p packages/domain/src/entities/models/$dir
  git mv apps/web/src/entities/models/$dir/form.ts packages/domain/src/entities/models/$dir/form.ts
  git mv apps/web/src/entities/models/$dir/config.ts packages/domain/src/entities/models/$dir/config.ts
  if [ -f apps/web/src/entities/models/$dir/bus.ts ]; then
    git mv apps/web/src/entities/models/$dir/bus.ts packages/domain/src/entities/models/$dir/bus.ts
  fi
  git mv apps/web/src/entities/models/$dir/index.ts packages/domain/src/entities/models/$dir/index.ts
done
for dir in postTag sectionPost; do
  mkdir -p packages/domain/src/entities/relations/$dir
  git mv apps/web/src/entities/relations/$dir/index.ts packages/domain/src/entities/relations/$dir/index.ts
done

# ----- Services -----
mkdir -p packages/services/src/adapters/amplify
mkdir -p packages/services/src/adapters/entities/core
mkdir -p packages/services/src/adapters/blogData
mkdir -p packages/services/src/app/entities/models
mkdir -p packages/services/src/app/entities/relations
# Adapters
git mv apps/web/src/amplify/amplifyConfig.ts packages/services/src/adapters/amplify/amplifyConfig.ts
git mv apps/web/src/amplify/setup.ts packages/services/src/adapters/amplify/setup.ts
git mv apps/web/src/entities/core/services packages/services/src/adapters/entities/core
# blogData fetch/load
git mv packages/ui/src/utils/blogData/fetchData.ts packages/services/src/adapters/blogData/fetchData.ts
git mv packages/ui/src/utils/blogData/loadData.ts packages/services/src/adapters/blogData/loadData.ts
# Use-cases
git mv apps/web/src/services/blogDataService.ts packages/services/src/app/blogDataService.ts
git mv packages/ui/src/utils/goToLoginWithReturn.ts packages/services/src/app/goToLoginWithReturn.ts
for dir in author comment post section tag todo userName userProfile; do
  mkdir -p packages/services/src/app/entities/models/$dir
  git mv apps/web/src/entities/models/$dir/service.ts packages/services/src/app/entities/models/$dir/service.ts
done
for dir in postTag sectionPost; do
  mkdir -p packages/services/src/app/entities/relations/$dir
  git mv apps/web/src/entities/relations/$dir/service.ts packages/services/src/app/entities/relations/$dir/service.ts
  git mv apps/web/src/entities/relations/$dir/sync.ts packages/services/src/app/entities/relations/$dir/sync.ts
done

# ----- Hooks/contexts core (UI) -----
mkdir -p packages/ui/src/entities/core/hooks
git mv apps/web/src/entities/core/hooks packages/ui/src/entities/core/hooks

# ----- Reste des utilitaires UI -----
# Le dossier utils a deja ete deplace en UI en debut de script.
# Les sous-dossiers deja migrants en services/domain sont traites ci-dessus.

# Nettoyage
rm -rf apps/web/src/i18n
rm -rf apps/web/src/entities
rm -rf apps/web/src/utils
rm -rf apps/web/src/components
rm -rf apps/web/src/context
rm -rf apps/web/src/auth
rm -rf apps/web/src/assets
rm -rf apps/web/src/home
rm -rf apps/web/src/services
rm -rf apps/web/src/amplify

