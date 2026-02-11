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
			console.error(`Missing UNKEY_ROOT_KEY ${rootKey}`);
			return;
		}

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

		const responseText = await verifyResponse.text();

		let data;
		try {
			data = JSON.parse(responseText);
		} catch (parseErr) {
			res.status(500).json({
				error: "Invalid response from authentication service",
			});
			return;
		}

		if (!verifyResponse.ok) {
			res.status(500).json({
				error: "Failed to verify API key",
				details: data.error || data.message || "Authentication service error",
			});
			return;
		}

		const result = data.data;

		if (!result || !result.valid) {
			res.status(401).json({
				error: "Invalid API key",
				reason: result?.code || "unknown",
			});
			return;
		}

		next();
	} catch (err) {
		console.error("Unkey exception:", err);
		res.status(500).json({
			error: "Server configuration error",
			details: err instanceof Error ? err.message : "Unknown error",
		});
	}
}
