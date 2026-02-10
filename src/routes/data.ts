import { Router } from "express";

const router = Router();

interface RandomUser {
	id: string;
	name: string;
	email: string;
	age: number;
	city: string;
}

interface RandomProduct {
	id: string;
	name: string;
	price: number;
	category: string;
	inStock: boolean;
}

interface RandomQuote {
	id: string;
	text: string;
	author: string;
}

function generateRandomUser(): RandomUser {
	const firstNames = ["Alice", "Bob", "Charlie", "Diana", "Eve", "Frank", "Grace", "Henry"];
	const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller"];
	const cities = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia"];

	const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
	const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];

	return {
		id: crypto.randomUUID(),
		name: `${firstName} ${lastName}`,
		email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
		age: Math.floor(Math.random() * 50) + 18,
		city: cities[Math.floor(Math.random() * cities.length)],
	};
}

function generateRandomProduct(): RandomProduct {
	const products = ["Laptop", "Smartphone", "Headphones", "Keyboard", "Mouse", "Monitor", "Tablet"];
	const categories = ["Electronics", "Accessories", "Computers", "Mobile"];

	return {
		id: crypto.randomUUID(),
		name: products[Math.floor(Math.random() * products.length)],
		price: Math.floor(Math.random() * 1000) + 50,
		category: categories[Math.floor(Math.random() * categories.length)],
		inStock: Math.random() > 0.3,
	};
}

function generateRandomQuote(): RandomQuote {
	const quotes = [
		{
			text: "The only way to do great work is to love what you do.",
			author: "Steve Jobs",
		},
		{
			text: "Innovation distinguishes between a leader and a follower.",
			author: "Steve Jobs",
		},
		{
			text: "Life is what happens when you're busy making other plans.",
			author: "John Lennon",
		},
		{
			text: "The future belongs to those who believe in the beauty of their dreams.",
			author: "Eleanor Roosevelt",
		},
	];

	const quote = quotes[Math.floor(Math.random() * quotes.length)];

	return {
		id: crypto.randomUUID(),
		...quote,
	};
}

router.get("/users", (req, res) => {
	const count = Number.parseInt(req.query.count as string) || 5;
	const users = Array.from({ length: Math.min(count, 100) }, () => generateRandomUser());

	res.json({
		data: users,
		count: users.length,
	});
});

router.get("/products", (req, res) => {
	const count = Number.parseInt(req.query.count as string) || 5;
	const products = Array.from({ length: Math.min(count, 100) }, () => generateRandomProduct());

	res.json({
		data: products,
		count: products.length,
	});
});

router.get("/quotes", (req, res) => {
	const count = Number.parseInt(req.query.count as string) || 1;
	const quotes = Array.from({ length: Math.min(count, 10) }, () => generateRandomQuote());

	res.json({
		data: quotes,
		count: quotes.length,
	});
});

router.get("/random", (req, res) => {
	const types = ["user", "product", "quote"];
	const randomType = types[Math.floor(Math.random() * types.length)];

	let data: RandomUser | RandomProduct | RandomQuote;

	if (randomType === "user") {
		data = generateRandomUser();
	} else if (randomType === "product") {
		data = generateRandomProduct();
	} else {
		data = generateRandomQuote();
	}

	res.json({
		type: randomType,
		data,
	});
});

export default router;
