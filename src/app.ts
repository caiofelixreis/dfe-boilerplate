import express from "express";
import {  initContextMiddleware, logRequestEndMiddleware } from "./middlewares";
import router from "./router";

const app = express();
const port = 3000;

app.use(initContextMiddleware);
app.use(logRequestEndMiddleware);

app.use("/api", router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
