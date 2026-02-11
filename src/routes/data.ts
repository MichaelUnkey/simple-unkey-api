import type { Router as ExpressRouter } from "express";
import { Router } from "express";

const router: ExpressRouter = Router();

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

interface RandomJoke {
	id: string;
	setup: string;
	punchline: string;
	category: string;
}

function generateRandomUser(): RandomUser {
	const firstNames = ["Alice", "Bob", "Charlie", "Diana", "Eve", "Frank", "Grace", "Henry", "Isabella", "Jack"];
	const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Wilson"];
	const cities = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Francisco", "Seattle"];

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
	const categories = ["Electronics", "Accessories", "Computers", "Mobile", "Home", "Kitchen"];

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
			text: "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.",
			author: "Albert Einstein",
		},
		{
			text: "Look up at the stars and not down at your feet.",
			author: "Stephen Hawking",
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

function generateRandomJoke(): RandomJoke {
	const jokes = [
		{
			setup: "Why do programmers prefer dark mode?",
			punchline: "Because light attracts bugs!",
			category: "Programming",
		},
		{
			setup: "Why did the developer go broke?",
			punchline: "Because he used up all his cache!",
			category: "Programming",
		},
		{
			setup: "What do you call a bear with no teeth?",
			punchline: "A gummy bear!",
			category: "General",
		},
		{
			setup: "Why don't scientists trust atoms?",
			punchline: "Because they make up everything!",
			category: "Science",
		},
		{
			setup: "How do you comfort a JavaScript bug?",
			punchline: "You console it!",
			category: "Programming",
		},
		{
			setup: "Why did the function break up with the variable?",
			punchline: "Because it had too many arguments!",
			category: "Programming",
		},
		{
			setup: "What's a pirate's favorite programming language?",
			punchline: "You'd think it's R, but it's actually the C!",
			category: "Programming",
		},
		{
			setup: "Why did the scarecrow win an award?",
			punchline: "Because he was outstanding in his field!",
			category: "General",
		},
	];

	const joke = jokes[Math.floor(Math.random() * jokes.length)];

	return {
		id: crypto.randomUUID(),
		...joke,
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

router.get("/jokes", (req, res) => {
	const count = Number.parseInt(req.query.count as string) || 1;
	const jokes = Array.from({ length: Math.min(count, 10) }, () => generateRandomJoke());

	res.json({
		data: jokes,
		count: jokes.length,
	});
});

export default router;
