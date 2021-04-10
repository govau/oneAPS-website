# OneAPS Api


## [Install dotnet core](https://docs.microsoft.com/en-us/dotnet/core/install/linux-snap#install-the-sdk)
```
sudo snap install dotnet-sdk --classic --channel=5.0
```

## [Install entity framework cli](https://docs.microsoft.com/en-us/ef/core/cli/)
```
dotnet tool install --global dotnet-ef &&
cat << \EOF >> ~/.bashrc
# Add .NET Core SDK tools
export PATH="$PATH:/home/dev/.dotnet/tools"
# Add .NET tools
export DOTNET_ROOT=/snap/dotnet-sdk/current
EOF
```

## Create Database
```
export ConnectionString="Host=localhost;Port=15432;Database=oneaps;Username=postgres;Password=password" &&
dotnet ef database update -p Services.Sql/Dta.OneAps.Api.Services.Sql.csproj
```

## Add Migration
```
export ConnectionString="Host=localhost;Port=15432;Database=oneaps;Username=postgres;Password=password" &&
dotnet ef migrations add <MIGRATION NAME> -p Services.Sql/Dta.OneAps.Api.Services.Sql.csproj
```

## Run
```
dotnet watch run -p Web/Dta.OneAps.Api.Web.csproj
```
