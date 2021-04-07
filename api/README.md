https://docs.microsoft.com/en-us/ef/core/cli/

Create Database
`dotnet tool install --global dotnet-ef`
`export ConnectionString="Host=localhost;Port=15432;Database=oneaps;Username=postgres;Password=password"`
`dotnet ef database update -p Services.Sql/Dta.OneAps.Api.Services.Sql.csproj`
`export PATH="$PATH:$HOME/.dotnet/tools"`

Add Migration
`export ConnectionString="Host=localhost;Port=15432;Database=oneaps;Username=postgres;Password=password"`
`dotnet ef migrations add <MIGRATION NAME> -p Services.Sql/Dta.OneAps.Api.Services.Sql.csproj`

Run
`dotnet watch run -p Web/Dta.OneAps.Api.Web.csproj`
