import { App } from "./config/app";
import env from "./environment";

const PORT = env.getPort();
const app = new App().app;

app.listen(PORT, () => {
  console.log("Express server listening on port " + PORT);
});
