import express from "express";
const app = express();
import cors from "cors";
import { PORT } from "./config/config.js";
import "./model/index.model.js";
import indexRoute from "./route/index.route.js";

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
  }));


app.use(express.json());
app.use(express.urlencoded());

app.use("/api", indexRoute);

app.listen(PORT, () => {
    console.log(`App listening at ${PORT}`);
  });
  