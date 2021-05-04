# OneAPS Api


## Run
```
export BUCKET_ARN="" &&
export BUCKET_NAME="" &&
export LOGGING_BUCKET_NAME="" &&
export S3_AWS_ACCESS_KEY_ID="" &&
export S3_AWS_SECRET_ACCESS_KEY="" &&
export S3_REGION="ap-southeast-2" &&
export JwtKey="JwtKeyJwtKeyJwtKeyJwtKeyJwtKey" &&
export JwtIssuer="http://localhost:8000" &&
export JwtAudience="http://localhost:8000" &&
export Salt="SecretSecret" && 
export ENDPOINT_ADDRESS="localhost" &&
export DB_PORT="15432" &&
export DB_NAME="oneaps" &&
export MASTER_USERNAME="postgres" &&
export MASTER_PASSWORD="password" &&
dotnet watch run -p Web/Dta.OneAps.Api.Web.csproj
```


## symbolic link
https://github.com/OmniSharp/omnisharp-vscode/issues/4037#issuecomment-765084998
sudo ln -s /snap/dotnet-sdk/current/dotnet /usr/local/bin/
