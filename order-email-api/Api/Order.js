import express from "express";
import cors from "cors";
import router from "../controllers/Controller";

const app = express();

app.use(cors({ origin: "https://minnaminnie.vercel.app" }));
app.use(express.json());

app.use("/api/order", router);

export default function handler(req, res) {
  return app(req, res);
}
