import "dotenv/config";
import express from "express";
import { PORT, __dirname } from "./lib/consts.js";
import * as logger from "./lib/logger.js";
import path from "path";

const server = express();
server.use("/assets", express.static(path.join(__dirname, "..", "..", "client", "assets")))

server.get("/", (res, req) => {
    req.sendFile(path.join(__dirname, "..", "..", "client", "index.html"))
});

await server.listen(PORT, () => {
    logger.success(`Server listening on http://localhost:${PORT}`)
})