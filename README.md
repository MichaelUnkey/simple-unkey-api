# Simple Unkey API

A simple TypeScript API that returns random data with Unkey authentication.

## Features

- 🔐 Unkey API key authentication
- 📊 Random data generation (users, products, quotes)
- ⚡ Fast and lightweight
- 🛠️ TypeScript with strict type checking
- 📝 Code style enforced with Biome

## Setup

### 1. Install dependencies

```bash
pnpm install
```

### 2. Configure environment variables

Copy `.env.example` to `.env` and add your Unkey credentials:

```bash
cp .env.example .env
```

Update the `.env` file with your actual Unkey credentials:
- `UNKEY_ROOT_KEY`: Your Unkey root key (get it from https://unkey.com)
- `UNKEY_API_ID`: Your Unkey API ID

### 3. Run the development server

```bash
pnpm dev
```

The server will start on `http://localhost:3000` (or the PORT specified in `.env`).

## API Endpoints

### Public Endpoints

- `GET /` - API information and available endpoints
- `GET /health` - Health check endpoint

### Protected Endpoints (require Unkey API key)

All endpoints under `/api/*` require a valid Unkey API key in the `Authorization` header.

- `GET /api/users?count=5` - Get random users
- `GET /api/products?count=5` - Get random products
- `GET /api/quotes?count=1` - Get random quotes
- `GET /api/random` - Get a random item of any type

### Authentication

Include your Unkey API key in the Authorization header:

```bash
curl -H "Authorization: Bearer your_api_key_here" http://localhost:3000/api/users
```

## Examples

### Get 10 random users

```bash
curl -H "Authorization: Bearer your_api_key_here" http://localhost:3000/api/users?count=10
```

### Get 5 random products

```bash
curl -H "Authorization: Bearer your_api_key_here" http://localhost:3000/api/products?count=5
```

### Get a random quote

```bash
curl -H "Authorization: Bearer your_api_key_here" http://localhost:3000/api/quotes
```

## Development

### Build for production

```bash
pnpm build
```

### Start production server

```bash
pnpm start
```

### Lint code

```bash
pnpm lint
```

### Auto-fix linting issues

```bash
pnpm lint:fix
```

## Tech Stack

- TypeScript
- Express.js
- Unkey for authentication
- Biome for linting and formatting
- pnpm for package management
