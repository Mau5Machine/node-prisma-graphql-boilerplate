# A Node, GraphQL Yoga, Prisma Boilerplate Project

A barebones Node.js app using:

- [GraphQL Yoga](https://github.com/prisma/graphql-yoga)
- [Prisma](https://www.prisma.io/docs)
- [NodeJs](https://nodejs.org/en/docs/)

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) and the [Docker](https://docs.docker.com/install/) installed.

```sh
git clone git@github.com:Mau5Machine/node-prisma-graphql-boilerplate.git # or clone your own fork
cd node-prisma-graphql-boilerplate
npm install
```

Once you have all of your dependencies installed, let's set some environment variables to connect to an external database. I am setup with [Postgres](https://www.postgresql.org/) in this boilerplate.

## Setting env variables

Change the name of the env.example file to .env or create a new .env file to read the environment variables.

There are 2 .env file locations in this project.

- One is at the root of the project for the port and the environment
- Another inside of prisma directory for the prisma and docker configurations

Once these values are set, enter the following into the command line

```
export PRISMA_MANAGEMENT_API_SECRET="__SECRET_KEY_HERE__"
```

Replace SECRET_KEY_HERE text with your secret key inside of your prisma/.env file.

## Building Prisma Container

With all your env variables set and your docker service running on your machine, you can now build up the prisma API client container.

Navigate to the prisma directory and enter in the command line the following

```
docker-compose up -d
# Once that is complete, enter the following
prisma deploy
```

If you set everything up properly, you should be able to navigate to [http://localhost:4466](http://localhost:4466) OR the to port 4466 of the docker IP address and you will see a GraphQL Playground.

## Starting Node Server

You can start your node server by typing in

```
npm run dev
```

## Author

- [Christian Martins](https://afkdeveloper.com)
