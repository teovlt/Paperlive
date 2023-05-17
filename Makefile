build:
	docker compose build
up:
	docker compose up -d
start:
	docker compose start	
down:
	docker compose down
stop:
	docker compose stop
restart:
	docker compose down
	docker compose up -d
ps:
	docker compose ps
logs-app:
	docker compose logs -f app
logs-api:
	docker compose logs -f api
logs-db:
	docker compose logs -f db
test:
	docker exec -it paperlive-api-1 npm run test -- --runInBand
coverage:
	docker exec -it paperlive-api-1 npm run coverage -- --runInBand
dropDatabase:
	rm -rf server/data
	find server/uploads -type f ! -name 'team-picture-default.png' -exec rm {} +
	make restart
insertAdmin:
	curl -s --location 'http://localhost:3000/api/auth/register' \
		--header 'Content-Type: application/json' \
		--data '{"name": "admin", "password": "admin"}'