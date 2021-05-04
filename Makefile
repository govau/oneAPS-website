run:
	docker-compose up -d

setup:
	sudo rm -rf ./client/.cache
	sudo rm -rf ./client/node_modules
	docker-compose build 
	docker-compose run api dotnet tool restore
	docker-compose run client npm install

update_db:
	docker-compose run dbupdate dotnet dotnet-ef database update


create_migration:
	docker-compose run dbupdate dotnet dotnet-ef migrations add $(name)


script_db:
	docker-compose run dbupdate dotnet dotnet-ef migrations script
