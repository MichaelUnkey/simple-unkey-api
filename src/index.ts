import dotenv from "dotenv";
import express from "express";
import { unkeyAuth } from "./middleware/auth.js";
import dataRoutes from "./routes/data.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

app.get("/", (req, res) => {
	res.json({
		message: "Simple Unkey API",
		version: "1.0.0",
		endpoints: {
			"/api/users": "Get random users (query: ?count=5)",
			"/api/products": "Get random products (query: ?count=5)",
			"/api/quotes": "Get random quotes (query: ?count=1)",
			"/api/jokes": "Get random jokes (query: ?count=1)",
			"/api/random": "Get a random item of any type",
		},
		note: "All /api/* endpoints require authentication via Unkey API key",
	});
});

app.get("/health", (req, res) => {
	res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use("/api", unkeyAuth, dataRoutes);

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
