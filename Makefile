dev:
	docker compose -f docker-compose.dev.yml up -d

build:
	docker compose -f docker-compose.dev.yml build

stop:
	docker compose -f docker-compose.dev.yml stop

clean:
	rm -rf server/data
	find server/uploads -type f ! -name 'team-picture-default.png' -exec rm {} +
	docker compose -f docker-compose.dev.yml down
	docker compose -f docker-compose.dev.yml up -d

deploy:
	docker compose -f docker-compose.prod.yml up --build -d

test:
	docker exex -it paperlive-api-1 npm run test -- --runInBand

coverage:
	docker exex -it paperlive-api-1 npm run coverage -- --runInBand