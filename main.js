require("dotenv").config();
import express from "express";
import path from "path";
import favicon from "serve-favicon";
import logger from "morgan";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import fileUpload from "express-fileupload";

const reactBuildDirectory = "../droplet-client/build";
const app = express();

app.set("port", process.env.PORT || 80);
app.use(favicon(reactBuildDirectory + "/favicon.ico"));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(fileUpload());
app.use(express.static(reactBuildDirectory));

app.get("/", function(request, response) {
  response.sendFile("index.html", { root: reactBuildDirectory });
});

app.listen(app.get("port"), function() {
  console.log("Node app is running at localhost:" + app.get("port"));
});
