import express from "express";
import cors from "cors";
import router from "./controllers/Controller.js"; // Make sure this path is correct

const app = express();

// ✅ List of all allowed frontend domains
const allowedOrigins = [
  "https://minnaminnie.vercel.app",
  "https://minnaminnie.com",
  "https://www.minnaminnie.com",
  "https://minnaminnie.pk",
  "https://www.minnaminnie.pk",
  "http://localhost:3000", // optional: dev environment
];

// ✅ CORS middleware
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS Error: Not allowed - " + origin));
      }
    },
  })
);

// ✅ Parse incoming JSON
app.use(express.json());

// ✅ Route
app.use("/api/order", router);

// ✅ Export Vercel serverless handler
export default function handler(req, res) {
  return app(req, res);
}
