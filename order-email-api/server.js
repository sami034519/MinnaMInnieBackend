// server.js (optional)
import express from "express";
import router from "./controllers/Controller.js";

const app = express();
app.use(express.json());
app.use("/api/order", router);

app.listen(3000, () => console.log("Listening on http://localhost:3000"));
