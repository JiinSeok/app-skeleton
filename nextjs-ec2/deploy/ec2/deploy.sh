#!/bin/bash
set -euo pipefail

# EC2에서 실행되는 배포 스크립트. 워크플로가 compose.yml/이 스크립트/자격증명 env를
# /tmp로 scp한 뒤 SSH로 이 파일을 호출한다.

if [ -f /tmp/app-deploy.env ]; then
  set -a
  # shellcheck disable=SC1091
  . /tmp/app-deploy.env
  set +a
  rm -f /tmp/app-deploy.env
fi

: "${IMAGE_TAG:?IMAGE_TAG is required}"
: "${AWS_REGION:?AWS_REGION is required}"
: "${STAGING_SECRET_ID:?STAGING_SECRET_ID is required}"
: "${GHCR_ACTOR:?GHCR_ACTOR is required}"
: "${GHCR_TOKEN:?GHCR_TOKEN is required}"

APP_DIR="/opt/app"
APP_ENV="${APP_DIR}/app.env"
COMPOSE_FILE="${APP_DIR}/compose.yml"
PROJECT_NAME="app"

# 디렉터리를 항상 선행 생성(멱등). first-deploy에서 'No such file or directory' 방지.
sudo -n install -d -m 700 -o ubuntu -g ubuntu "${APP_DIR}"
sudo -n install -m 600 -o ubuntu -g ubuntu /tmp/app-compose.yml "${COMPOSE_FILE}"

secret_json="$(aws secretsmanager get-secret-value --secret-id "${STAGING_SECRET_ID}" --region "${AWS_REGION}" --query SecretString --output text)"
postgres_password="$(jq -r '.POSTGRES_PASSWORD // empty' <<< "${secret_json}")"
auth_secret="$(jq -r '.AUTH_SECRET // empty' <<< "${secret_json}")"
s3_bucket="$(jq -r '.S3_BUCKET // empty' <<< "${secret_json}")"
initial_admin_email="$(jq -r '.INITIAL_ADMIN_EMAIL // empty' <<< "${secret_json}")"
initial_admin_password="$(jq -r '.INITIAL_ADMIN_PASSWORD // empty' <<< "${secret_json}")"
initial_admin_name="$(jq -r '.INITIAL_ADMIN_NAME // empty' <<< "${secret_json}")"

: "${postgres_password:?POSTGRES_PASSWORD is required in ${STAGING_SECRET_ID}}"
: "${auth_secret:?AUTH_SECRET is required in ${STAGING_SECRET_ID}}"

umask 077
cat > "${APP_ENV}" <<ENV
IMAGE_TAG=${IMAGE_TAG}
POSTGRES_PASSWORD=${postgres_password}
AUTH_SECRET=${auth_secret}
AUTH_URL=https://${PUBLIC_DOMAIN:-staging.example.com}
AUTH_TRUST_HOST=true
AWS_REGION=${AWS_REGION}
S3_BUCKET=${s3_bucket}
INITIAL_ADMIN_EMAIL=${initial_admin_email}
INITIAL_ADMIN_PASSWORD=${initial_admin_password}
INITIAL_ADMIN_NAME=${initial_admin_name}
PUBLIC_DOMAIN=${PUBLIC_DOMAIN:-staging.example.com}
ENV

printf '%s\n' "${GHCR_TOKEN}" | docker login ghcr.io -u "${GHCR_ACTOR}" --password-stdin
trap 'docker logout ghcr.io >/dev/null 2>&1 || true' EXIT

cd "${APP_DIR}"
compose() { docker compose --project-name "${PROJECT_NAME}" --env-file "${APP_ENV}" -f "${COMPOSE_FILE}" "$@"; }

compose pull
compose up -d postgres
compose --profile migrate run --rm migrate

if [ -n "${initial_admin_password}" ]; then
  compose run --rm app pnpm db:seed
fi

compose up -d --remove-orphans app caddy

# 헬스체크: /api/health가 200을 줄 때까지 대기.
for _ in $(seq 1 45); do
  if curl -fsS http://127.0.0.1:3000/api/health >/dev/null; then
    docker image prune -f --filter "until=168h" >/dev/null
    exit 0
  fi
  sleep 2
done

compose logs --tail 160 app caddy || true
exit 1
