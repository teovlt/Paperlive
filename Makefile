build:
	docker compose --build -d
up:
	docker compose up -d
start:
	docker compose start	
down:
	docker compose down
stop:
	docker compose stop
restart:
	docker compose stop
	docker compose up