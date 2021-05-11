SHELL = /bin/sh

CURRENT_UID := $(shell id -u)
CURRENT_GID := $(shell id -g)

export CURRENT_UID
export CURRENT_GID

run:
	docker-compose up -d

stop:
	docker-compose down

show_log:
	docker-compose logs -f api client

setup: clean build_images restore

clean: 
	sudo rm -rf ./client/.cache
	sudo rm -rf ./client/node_modules
	sudo rm -rf ./api/**/obj
	sudo rm -rf ./api/**/bin

build_images:
	docker-compose build --build-arg USER=${USER} --build-arg USER_ID=${CURRENT_UID} --build-arg GROUP_ID=${CURRENT_GID}

restore:
	docker-compose run api dotnet tool restore
	docker-compose run client npm install

# run this after localstack has started
create_bucket:
	aws --endpoint-url=http://localhost:9566 s3 mb s3://oneaps-bucket-local

update_db:
	docker-compose run dbupdate dotnet dotnet-ef database update


create_migration:
	docker-compose run dbupdate dotnet dotnet-ef migrations add $(name)


script_db:
	docker-compose run dbupdate dotnet dotnet-ef migrations script
