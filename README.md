# my-blog

# Start postgres docker

`docker compose up -d`

# Dive into docker container
`docker exec -it postgres_node_blog bash`
# Login to postgres
`psql -U postgres`
# Create new database

`CREATE DATABASE blogs;`
# Choose new created database
`\c blogs; `

# Now create table by executing commands in our [schema](./utils/schema.sql)

# Check again
`\dt;`
## To check table 
`\d users;`
