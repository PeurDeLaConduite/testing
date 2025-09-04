#!/usr/bin/env bash
set -euxo pipefail

ROOT_DIR="$(git rev-parse --show-toplevel)"

# Création des dossiers cibles
mkdir -p "$ROOT_DIR/packages/ui/src/__tests__"
mkdir -p "$ROOT_DIR/packages/domain/tests"
mkdir -p "$ROOT_DIR/packages/services/src/app/__tests__"
mkdir -p "$ROOT_DIR/packages/services/src/adapters/__tests__"
mkdir -p "$ROOT_DIR/apps/web/tests/unit"
mkdir -p "$ROOT_DIR/apps/web/tests/api"
mkdir -p "$ROOT_DIR/apps/web/tests/e2e"
mkdir -p "$ROOT_DIR/apps/web/tests/_legacy"

# Renommer *.spec.* en *.test.*
find "$ROOT_DIR" -type f \( -name "*.spec.ts" -o -name "*.spec.tsx" -o -name "*.spec.js" \) | while read -r file; do
  git mv "$file" "${file/.spec./.test.}" 2>/dev/null || mv "$file" "${file/.spec./.test.}"

done

move_or_backup() {
  local src="$1"
  local dest="$2"
  mkdir -p "$(dirname "$dest")"
  git mv "$src" "$dest" 2>/dev/null || mv "$src" "$dest"
}

classify() {
  local file="$1"
  case "$file" in
    *src/components*|*src/**/hooks*|*.test.tsx)
      dest="$ROOT_DIR/packages/ui/src/${file#*src/}"
      dest="${dest%/*}/__tests__/$(basename "$file")"
      ;;
    *normalize*.test.ts|*sync*.test.ts|*toggleId.test.ts|*createModelForm.test.ts|*forms/*.test.ts)
      dest="$ROOT_DIR/packages/domain/tests/$(basename "$file")"
      ;;
    *crudService.test.ts|*amplify*.test.ts|*relationService.test.ts)
      dest="$ROOT_DIR/packages/services/src/adapters/__tests__/$(basename "$file")"
      ;;
    *services/*|*usecase*.test.ts)
      dest="$ROOT_DIR/packages/services/src/app/__tests__/$(basename "$file")"
      ;;
    *tests/e2e/*)
      dest="$ROOT_DIR/apps/web/tests/e2e/$(basename "$file")"
      ;;
    *tests/unit/*)
      dest="$ROOT_DIR/apps/web/tests/unit/$(basename "$file")"
      ;;
    *tests/api/*)
      dest="$ROOT_DIR/apps/web/tests/api/$(basename "$file")"
      ;;
    *)
      dest="$ROOT_DIR/apps/web/tests/_legacy/$(basename "$file")"
      ;;
  esac
  move_or_backup "$file" "$dest"
}

find "$ROOT_DIR/apps/web" -type f \( -name "*.test.ts" -o -name "*.test.tsx" \) | while read -r file; do
  classify "$file"

done
