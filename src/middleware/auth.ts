import { verifyKey } from "@unkey/api";
import type { NextFunction, Request, Response } from "express";

export async function unkeyAuth(req: Request, res: Response, next: NextFunction): Promise<void> {
	const authHeader = req.headers.authorization;

	if (!authHeader) {
		res.status(401).json({ error: "Missing authorization header" });
		return;
	}

	const token = authHeader.startsWith("Bearer ") ? authHeader.substring(7) : authHeader;

	const { result, error } = await verifyKey({ key: token });

	if (error) {
		res.status(500).json({ error: "Failed to verify API key" });
		return;
	}

	if (!result.valid) {
		res.status(401).json({ error: "Invalid API key" });
		return;
	}

	next();
}
