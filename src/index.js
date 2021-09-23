import Koa from "koa";
import router from "./routes.js";
import sequelize from './database/index.js'

sequelize.sync().then(() => console.log('[System] The DB is running...'));

const app = new Koa();

app
    .use(router.routes())
    .use(router.allowedMethods());

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT);

export default server;
