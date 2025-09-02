export NODE_ENV=production
PORT=${PORT:-3000}
echo "Starting floe-ice on port $PORT (NODE_ENV=$NODE_ENV)"
exec npm run start
