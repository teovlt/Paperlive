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
logs:
	docker compose logs -f api