FROM mcr.microsoft.com/dotnet/sdk:3.1
WORKDIR /api/Web
COPY .config/ .config/
RUN dotnet tool restore
EXPOSE 5001
CMD ["dotnet", "watch", "run"]