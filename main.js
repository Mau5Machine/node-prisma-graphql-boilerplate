require("dotenv").config();
import { prisma } from "./src/generated/prisma-client";
import { GraphQLServer } from "graphql-yoga";

const resolvers = {
  Query: {
    info: () => `This is the API for a simple`,
    feed: (root, args, context, info) => {
      return context.prisma.links();
    }
  },
  Mutation: {
    post: (root, args, context) => {
      return context.prisma.createLink({
        url: args.url,
        description: args.description
      });
    }
  }
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: { prisma }
});

server.start(() => console.log(`Server is running on localhost:80`));
