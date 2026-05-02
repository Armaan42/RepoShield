# Local Installation Guide

To run Reposhield on your local machine, you'll need to run a few services concurrently since the application relies on external webhooks and background workers.

## Prerequisites
- **Node.js** (v18+)
- **Bun** (Package Manager)
- **PostgreSQL** (Local installation, Docker, or Supabase)
- **ngrok** (For exposing your local server to GitHub webhooks)

---

## 1. Install Dependencies
Clone the repository and install all required packages using Bun:
```bash
git clone https://github.com/Armaan42/reposhield.git
cd reposhield
bun install
```

## 2. Environment Configuration
Copy the sample environment file:
```bash
cp .env.example .env
```
Open `.env` and configure the following essential keys:
- `DATABASE_URL`: Your Postgres connection string.
- `BETTER_AUTH_SECRET`: A random 32-character string.
- `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET`: Create an OAuth App in your GitHub Developer Settings.
- `GITHUB_APP_ID` / `GITHUB_PRIVATE_KEY` / `GITHUB_WEBHOOK_SECRET`: Create a GitHub App to receive PR webhooks.
- `GEMINI_API_KEY`: Get this from Google AI Studio.
- `POLAR_ACCESS_TOKEN` / `POLAR_WEBHOOK_SECRET`: Get these from Polar.sh (sandbox or production).

## 3. Database Initialization
Generate the Prisma client and push the schema to your database:
```bash
bunx prisma generate
bunx prisma db push
```

## 4. Booting the Application
Because Reposhield is a complex system, you must run **4 separate terminal windows** to run everything locally.

### Terminal 1: Next.js Frontend & API
```bash
bun run dev
```
Runs the web app on `http://localhost:3000`.

### Terminal 2: Inngest Background Worker
```bash
npx inngest-cli@latest dev
```
Starts the local Inngest dev server. This connects to your Next.js app to process background jobs.

### Terminal 3: Webhook Tunnel (ngrok)
```bash
ngrok http 3000
```
This gives you a public URL (e.g., `https://abc-123.ngrok-free.app`). 
**Crucial Step:** You must paste this ngrok URL into your GitHub App's Webhook URL setting (append `/api/webhook`), and add it to your Better Auth trusted origins in `lib/auth.ts` or `.env`.

### Terminal 4: Database GUI (Optional but helpful)
```bash
bunx prisma studio
```
Starts a visual database editor on `http://localhost:5555`.
