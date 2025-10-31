#!/usr/bin/env bash
set -euo pipefail
if [ $# -lt 2 ]; then
  echo "Usage: $0 <service-name> <runtime> [db:none|postgres]" >&2
  exit 1
fi

NAME="$1"; RUNTIME="$2"; DB="${3:-none}"
BASE_DIR="$(cd "$(dirname "$0")/.." && pwd)"

case "$RUNTIME" in
  node) TEMPLATE="$BASE_DIR/templates/node" ;;
  *) echo "Unsupported runtime: $RUNTIME"; exit 2 ;;
esac

DEST="$BASE_DIR/services/$NAME"
mkdir -p "$DEST"
cp -R "$TEMPLATE/"* "$DEST/"

# Rename default image/repo references later if needed (Helm values etc.)
# (No Helm values yet in this minimal step)

# Mark chosen DB (future use)
[ "$DB" = "postgres" ] && echo "DB=postgres" > "$DEST/.service-db" || true

echo "Service '$NAME' created at: $DEST"
