run: run_api run_client # make run -j2

run_client:
	(cd client && npm run watch)

run_api:
	(cd api/Web && dotnet run watch)

setup:
	(cd client && npm i)
	(sudo snap install dotnet-sdk --classic --channel=5.0)
	(dotnet tool install --global dotnet-ef)
	(cat << \EOF >> ~/.bashrc\
	# Add .NET Core SDK tools\
	export PATH="$PATH:/home/dev/.dotnet/tools"\
	# Add .NET tools\
	export DOTNET_ROOT=/snap/dotnet-sdk/current\
	EOF)

update_db:
	(cd api/Services.Sql &&\
	export ConnectionString="Host=localhost;Port=15432;Database=oneaps;Username=postgres;Password=password" &&\
	dotnet ef database update)
