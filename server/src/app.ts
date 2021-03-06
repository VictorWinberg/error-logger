import bodyParser from "body-parser";
import dotenv from "dotenv";
import express from "express";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../..", ".env") });

import db from "./models";
import routes from "./routes";

const app = express();

const clientDist = path.resolve(__dirname, "../..", "client", "dist");

app.use(express.static(clientDist));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/static"));

routes(app, db);

app.get("/api/*", (_, res) => {
  res.status(405).send("Method Not Allowed");
});

app.get("*", (_, res) => {
  res.sendFile(path.resolve(clientDist, "index.html"));
});

export default app;
