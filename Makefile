run:
	docker-compose up -d

stop:
	docker-compose down

show_log:
	docker-compose logs -f api client

setup:
	sudo rm -rf ./client/.cache
	sudo rm -rf ./client/node_modules
	docker-compose build 
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
