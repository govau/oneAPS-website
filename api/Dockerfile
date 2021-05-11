FROM mcr.microsoft.com/dotnet/sdk:3.1

ARG USER
ARG USER_ID
ARG GROUP_ID

RUN addgroup --gid $GROUP_ID ${USER}
RUN adduser --disabled-password --gecos '' --uid $USER_ID --gid $GROUP_ID ${USER}
USER ${USER}

ENV API_PATH=/home/${USER}/code/oneAPS-website
RUN mkdir -p $API_PATH
RUN ln -s /api $API_PATH

WORKDIR $API_PATH/api
COPY .config/ .config/
RUN dotnet tool restore

WORKDIR $API_PATH/api/Web

EXPOSE 5001

CMD ["dotnet", "watch", "run"]