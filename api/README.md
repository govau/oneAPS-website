

https://docs.microsoft.com/en-us/ef/core/cli/


Scaffolding the database
`dotnet ef dbcontext scaffold "Host=localhost;Port=15432;Database=oneaps;Username=postgres;Password=password" Npgsql.EntityFrameworkCore.PostgreSQL -o ./Entities --data-annotations --force -c OneApsContext`


Create Database
`export ConnectionString="Host=localhost;Port=15432;Database=oneaps;Username=postgres;Password=password"`
`dotnet ef migrations add Initial -p Services.Sql/Dta.OneAps.Api.Services.Sql.csproj`

Run
`dotnet watch run -p ./Web/Dta.OneAps.Api.Web.csproj`