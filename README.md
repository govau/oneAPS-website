# oneAPS

## Setup and installation

Docker needs to be installed.  Once installed, you can run the following:

`make setup`

## Running

`make run`

## Setup database

Firt create a database called `oneaps` in your local postgres.  This can be done using pgadmin.

`make update_db`

## Create bucket

Create a bucket in localstack. Execute this after local stack is running

`make create_bucket`

## Show logs

Show logs as they come through the client and api

`make show_log`

## Create database migration scripts

`make create_migration <NewMigration>`

Once this executes, look for the new migration in `api/Services.Sql/Migrations/

## Create SQL scripts

`make script_db`

## Stop containers

`make stop`