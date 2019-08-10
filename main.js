require("dotenv").config();
import express from "express";
import path from "path";
import { GraphQLServer } from "graphql-yoga";
import favicon from "serve-favicon";
import logger from "morgan";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import fileUpload from "express-fileupload";

let links = [
  {
    id: "link-1",
    url: "www.sparkv2.website",
    description: "Something to talk about"
  }
];
let idCount = links.length;
const resolvers = {
  Query: {
    info: () => `This is the API for a simple`,
    feed: () => links
  },
  Mutation: {
    post: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url
      };
      links.push(link);
      return link;
    }
  }
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers
});

server.start(() => console.log(`Server is running on localhost:80`));
// let reactBuildDirectory = "../droplet-client/build";
// const app = express();

// app.set("port", process.env.PORT || 80);
// app.use(favicon(reactBuildDirectory + "/favicon.ico"));
// app.use(logger("dev"));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cookieParser());
// app.use(cors());
// app.use(fileUpload());
// app.use(express.static(reactBuildDirectory));

// app.get("/", function(request, response) {
//   response.sendFile("index.html", { root: reactBuildDirectory });
//   response.sendFile("Hello World");
// });

// app.listen(app.get("port"), function() {
//   console.log("Node app is running at localhost:" + app.get("port"));
// });
