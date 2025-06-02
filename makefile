#!/usr/bin/make

up:
	docker compose -f docker-compose.yml up -d
down:
	docker compose -f docker-compose.yml down
build-up:
	docker compose -f docker-compose.yml up --build -d
