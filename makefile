#!/usr/bin/make

up:
	docker compose -f docker-compose.yml up -d
down:
	docker compose -f docker-compose.yml down
build-up:
	docker compose -f docker-compose.yml up --build -d
publish-blazorweb:
	dotnet publish BlazorWeb/BlazorWeb.csproj -c Release -o web
copy-static-apps:
	cp -r StaticApps/* web/wwwroot/
clear-wwwroot:
	rm -r web/wwwroot
update-apiserver:
	docker compose -f docker-compose.yml up --build -d apiserver