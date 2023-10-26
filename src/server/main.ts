import "dotenv/config";
import express from "express";
import { PORT } from "./lib/consts";
import * as logger from "./lib/logger";
import path from "path";

const server = express();
server.use("/assets", express.static(path.join(__dirname, "..", "client", "assets")))

server.get("/", (res, req) => {
    req.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

(async function () {
    await server.listen(PORT);
    logger.success("Server listening at http://localhost:" + PORT)
})().catch(() => {
    // Server crash, restart
    logger.error("Server crashed, restarting")
    setTimeout(async () => {
        await server.listen(PORT);
        logger.success("Server listening at http://localhost:" + PORT)
    }, 1000)
})