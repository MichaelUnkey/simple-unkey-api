import type { NextFunction, Request, Response } from "express";

export async function unkeyAuth(req: Request, res: Response, next: NextFunction): Promise<void> {
	const authHeader = req.headers.authorization;

	if (!authHeader) {
		res.status(401).json({ error: "Missing authorization header" });
		return;
	}

	const token = authHeader.startsWith("Bearer ") ? authHeader.substring(7) : authHeader;

	try {
		const rootKey = process.env.UNKEY_ROOT_KEY;

		if (!rootKey) {
			res.status(500).json({ error: "Server configuration error: Missing UNKEY_ROOT_KEY" });
			return;
		}

		console.log("Verifying key - token:", token);

		const verifyResponse = await fetch("https://api.unkey.com/v2/keys.verifyKey", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${rootKey}`,
			},
			body: JSON.stringify({
				key: token,
			}),
		});

		console.log("HTTP Status:", verifyResponse.status);
		const responseText = await verifyResponse.text();
		console.log("Raw response:", responseText);

		let data;
		try {
			data = JSON.parse(responseText);
		} catch (parseErr) {
			console.error("Failed to parse response:", parseErr);
			res.status(500).json({
				error: "Invalid response from authentication service",
			});
			return;
		}

		console.log("Parsed data:", JSON.stringify(data, null, 2));

		if (!verifyResponse.ok) {
			console.error("Unkey API error:", data);
			res.status(500).json({
				error: "Failed to verify API key",
				details: data.error || data.message || "Authentication service error",
			});
			return;
		}

		const result = data.data;

		if (!result || !result.valid) {
			console.log("Invalid API key - code:", result?.code);
			res.status(401).json({
				error: "Invalid API key",
				reason: result?.code || "unknown",
			});
			return;
		}

		console.log("API key verified successfully");
		next();
	} catch (err) {
		console.error("Unkey exception:", err);
		res.status(500).json({
			error: "Server configuration error",
			details: err instanceof Error ? err.message : "Unknown error",
		});
	}
}
