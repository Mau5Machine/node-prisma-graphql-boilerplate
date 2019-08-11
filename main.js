require("dotenv").config();
const Query = require("./src/resolvers/Query");
const Mutation = require("./src/resolvers/Mutation");
const User = require("./src/resolvers/User");
const Link = require("./src/resolvers/Link");
const Subscription = require("./src/resolvers/Subscription");
const Vote = require("./src/resolvers/Vote");
import { prisma } from "./src/generated/prisma-client";
import { GraphQLServer } from "graphql-yoga";

const resolvers = {
  Query,
  Mutation,
  Subscription,
  User,
  Link,
  Vote
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: request => {
    return {
      ...request,
      prisma
    };
  }
});

server.start(() =>
  console.log(`Server is running on http://localhost:${process.env.PORT}`)
);
