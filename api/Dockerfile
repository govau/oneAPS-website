FROM mcr.microsoft.com/dotnet/sdk:3.1

ARG USER
ARG USER_ID
ARG GROUP_ID

ENV API_PATH=/home/${USER}/code/oneAPS-website
RUN mkdir -p $API_PATH
RUN ln -s /api $API_PATH

RUN addgroup --gid $GROUP_ID user
RUN adduser --disabled-password --gecos '' --uid $USER_ID --gid $GROUP_ID user
USER user


WORKDIR $API_PATH/api/Web
COPY .config/ .config/
RUN dotnet tool restore
EXPOSE 5001
CMD ["dotnet", "watch", "run"]