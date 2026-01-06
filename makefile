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
down-nginx:
	docker compose down nginx
down-napiserver:
	docker compose down nginx
update-nginx: down-nginx
	docker compose build nginx
	docker compose up nginx -d
update-apiserver:
	docker compose -f docker-compose.yml up --build -d apiserver
update-frontend: clear-wwwroot publish-blazorweb copy-static-apps update-nginx
run-apiserver-console:
	docker exec -it web-apiserver /bin/bash