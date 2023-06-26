require("dotenv").config();

import { App, SSLApp } from "uWebSockets.js";
import router from "./router";
import logger from "./core/logger";

if (!process.env.RELEACE) {
  process.on("SIGINT", async () => {
    process.exit();
  });
}
const { HOST_PROTO, HOST_ADDR, HOST_NAME, HOST_PORT, HOST_CRT, HOST_KEY, VERSION, RELEASE } =
  process.env;

logger.info("mode " + (RELEASE ? "Release v-" + VERSION : "development"));

const app =
  HOST_PROTO === "https"
    ? SSLApp({
        cert_file_name: HOST_CRT,
        key_file_name: HOST_KEY,
      }).addServerName(HOST_NAME, {
        cert_file_name: HOST_CRT,
        key_file_name: HOST_KEY,
      })
    : App().addServerName(HOST_NAME, {});

router(app);
app
  .any("/*", (res) => res.writeStatus("404").end("Path not exist!") as any)
  .listen(HOST_ADDR, parseInt(HOST_PORT), (listenSocket) => {
    logger.info(
      listenSocket
        ? `🔥🔥🔥 Server domain: ${HOST_NAME}. Ready for Sockets: ${HOST_PROTO}://${HOST_ADDR}:${HOST_PORT} 🔥🔥🔥`
        : `❌❌❌    Port ${HOST_PORT} is in use!    ❌❌❌`
    );
  });
