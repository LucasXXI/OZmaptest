import Koa from "koa";
import router from "./routes.js";
import sequelize from "./database/index.js";
import cors from "@koa/cors";
import swagger from "swagger2";
import swagger2koa from "swagger2-koa";
const { ui } = swagger2koa;

sequelize.sync().then(() => console.log("[System] The DB is running..."));

const swaggerDocument = swagger.loadDocumentSync("src/api.yaml");

const app = new Koa();

app
  .use(ui(swaggerDocument, "/documentation"))
  .use(cors())
  .use(router.routes())
  .use(router.allowedMethods());

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT);

export default server;
