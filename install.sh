#!/usr/bin/env bash
set -euo pipefail

INSTALL_DIR="/opt/bf_optim_fph"
SERVICE_NAME="bf_optim_fph"
NGINX_SNIPPET="/etc/nginx/snippets/bf_optim_fph_location.conf"
BRUNO_CONF="/etc/nginx/sites-available/bruno"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

if [[ $EUID -ne 0 ]]; then
  echo "Run as root: sudo bash install.sh" >&2
  exit 1
fi

echo "==> Installing Node.js and npm..."
if ! command -v node &>/dev/null; then
  apt-get update -q
  apt-get install -y nodejs npm
else
  echo "    node $(node --version) already installed, skipping."
fi

echo "==> Copying project to $INSTALL_DIR..."
mkdir -p "$INSTALL_DIR"
rsync -a --exclude='.git' --exclude='node_modules' \
  "$SCRIPT_DIR/" "$INSTALL_DIR/"

echo "==> Installing npm dependencies..."
cd "$INSTALL_DIR"
npm install --production --silent

chown -R www-data:www-data "$INSTALL_DIR"

echo "==> Installing systemd service..."
cp "$INSTALL_DIR/deploy/bf_optim_fph.service" "/etc/systemd/system/${SERVICE_NAME}.service"
systemctl daemon-reload
systemctl enable "$SERVICE_NAME"

echo "==> Starting service..."
systemctl restart "$SERVICE_NAME"
systemctl status "$SERVICE_NAME" --no-pager

echo "==> Configuring nginx..."
mkdir -p /etc/nginx/snippets
cp "$INSTALL_DIR/deploy/nginx-bf_optim_fph.conf" "$NGINX_SNIPPET"

# Le vhost bruno doit contenir : include /etc/nginx/snippets/*_location.conf;
# Ajouter ce glob include s'il n'est pas encore présent.
if [[ -f "$BRUNO_CONF" ]]; then
  if ! grep -q 'snippets/\*_location\.conf' "$BRUNO_CONF"; then
    sed -i '/listen 443 ssl/a\    include /etc/nginx/snippets/*_location.conf;' "$BRUNO_CONF"
    echo "    Added glob include to $BRUNO_CONF"
  else
    echo "    Glob include already present in $BRUNO_CONF"
  fi
else
  echo "  WARNING: $BRUNO_CONF not found. Add manually to your nginx vhost:" >&2
  echo "    include /etc/nginx/snippets/*_location.conf;" >&2
fi

# Ensure all limit_req_zone definitions are present in nginx http block
RATE_LIMIT_CONF="/etc/nginx/conf.d/rate_limit.conf"
cat > "$RATE_LIMIT_CONF" << 'NGINXEOF'
limit_req_zone $binary_remote_addr zone=global:10m rate=30r/s;
limit_req_zone $binary_remote_addr zone=auth:10m   rate=5r/m;
NGINXEOF
echo "    Updated $RATE_LIMIT_CONF (zones: global, auth)"

nginx -t
systemctl reload nginx

echo ""
echo "Done. Optimiseur disponible sous https://bfablet92.hd.free.fr/fph_optim/"
