#!/usr/bin/make

up:
	docker compose -f docker-compose.yml up -d
down:
	docker compose -f docker-compose.yml down
build-up:
	docker compose -f docker-compose.yml up --build -d
publish-blazorweb:
	dotnet publish BlazorWeb/BlazorWeb.csproj -c Release -o web

update-apiserver:
	docker compose -f docker-compose.yml up --build -d apiserver