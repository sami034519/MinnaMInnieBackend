import express from "express";
import cors from "cors";
import router from "./controllers/Controller.js"; // Make sure this path is correct

const app = express();

// CORS Configuration (update frontend URL if needed)
app.use(
  cors({
    origin: "https://minnaminnie.vercel.app", // allow frontend domain
  })
);

// Middleware to parse JSON
app.use(express.json());

// Mount the email order route
app.use("/api/order", router);

// Vercel Handler - required for serverless deployment
export default function handler(req, res) {
  return app(req, res);
}
