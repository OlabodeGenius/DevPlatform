#!/usr/bin/env bash
set -euo pipefail

# Simple DevPlatform service generator.
# Usage:
#   ./scripts/create-service.sh <service-name> [port]
#
# Example:
#   ./scripts/create-service.sh orders-api 4000

if [[ "${1:-}" == "" ]]; then
  echo "Usage: $0 <service-name> [port]" >&2
  exit 1
fi

SERVICE_NAME="$1"
PORT="${2:-3000}"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"

TEMPLATE_NAME="api-gateway"
TEMPLATE_DIR="${ROOT_DIR}/services/${TEMPLATE_NAME}"
TARGET_DIR="${ROOT_DIR}/services/${SERVICE_NAME}"

if [[ ! -d "${TEMPLATE_DIR}" ]]; then
  echo "Error: template service '${TEMPLATE_NAME}' not found in services/." >&2
  exit 1
fi

if [[ -e "${TARGET_DIR}" ]]; then
  echo "Error: target service directory '${TARGET_DIR}' already exists." >&2
  exit 1
fi

echo "👉 Creating new service '${SERVICE_NAME}' from template '${TEMPLATE_NAME}'..."

# 1) Copy template service folder
cp -R "${TEMPLATE_DIR}" "${TARGET_DIR}"

# 2) Remove node_modules inside the new service if it exists
rm -rf "${TARGET_DIR}/node_modules" || true

# 3) Update package.json name field
PKG_JSON="${TARGET_DIR}/package.json"

if [[ -f "${PKG_JSON}" ]]; then
  node - "${PKG_JSON}" "${SERVICE_NAME}" << 'EOF_NODE'
const fs = require('fs');
const [,, path, serviceName] = process.argv;

const pkg = JSON.parse(fs.readFileSync(path, 'utf8'));
pkg.name = serviceName;

fs.writeFileSync(path, JSON.stringify(pkg, null, 2));
EOF_NODE
  echo "   - Updated package.json name to '${SERVICE_NAME}'"
else
  echo "   - Warning: package.json not found in new service, skipping name update"
fi

# 4) Optionally customise the root message in app/index.js
APP_INDEX="${TARGET_DIR}/app/index.js"
if [[ -f "${APP_INDEX}" ]]; then
  sed -i "s/DevPlatform template service/DevPlatform ${SERVICE_NAME} service/g" "${APP_INDEX}" || true
  echo "   - Updated root route message in app/index.js"
fi

# 5) Generate Kubernetes manifest from api-gateway.yaml
K8S_SRC="${ROOT_DIR}/k8s/api-gateway.yaml"
K8S_DEST="${ROOT_DIR}/k8s/${SERVICE_NAME}.yaml"

if [[ -f "${K8S_SRC}" ]]; then
  sed "s/api-gateway/${SERVICE_NAME}/g" "${K8S_SRC}" > "${K8S_DEST}"
  echo "   - Created k8s manifest: k8s/${SERVICE_NAME}.yaml"
else
  echo "   - Warning: k8s/api-gateway.yaml not found, skipping k8s manifest generation"
fi

echo "✅ Service '${SERVICE_NAME}' created."
echo "Next steps:"
echo "  cd services/${SERVICE_NAME}"
echo "  npm install"
echo "  npm test"
echo "  npm run lint"
echo "  npm start"

