#!/usr/bin/env bash
set -e

echo "Running alembic migrations (will retry up to 10 times if DB not ready)..."

n=0
until alembic upgrade head
do
  n=$((n+1))
  if [ "$n" -ge 10 ]; then
    echo "alembic upgrade failed after $n attempts"
    exit 1
  fi
  echo "alembic failed, retry #$n in 3s..."
  sleep 3
done

echo "Migrations applied, starting uvicorn..."
exec uvicorn app.main:app --host 0.0.0.0 --port 8000