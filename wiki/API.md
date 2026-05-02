# API & Commands

This page documents the internal API routes, external webhook endpoints, and background events used in Reposhield.

## Next.js API Routes

### `POST /api/webhook`
- **Purpose**: Receives incoming webhook events directly from GitHub (e.g., Pull Request opened, updated).
- **Behavior**: Validates the GitHub signature using `GITHUB_WEBHOOK_SECRET`. Extracts the repository ID and PR number, then dispatches an Inngest event to process the review asynchronously. Does *not* block to perform the AI logic.

### `POST /api/webhooks/polar`
- **Purpose**: Receives billing and subscription events from Polar.sh.
- **Behavior**: Validates the Polar webhook signature. Upon receiving a successful payment or subscription creation event, it updates the corresponding User's `subscriptionTier` in the PostgreSQL database to `"PRO"`.

### `GET/POST /api/inngest`
- **Purpose**: The endpoint that the Inngest execution engine communicates with to trigger background functions.
- **Behavior**: Hosted by the Next.js server but invoked by the Inngest infrastructure to execute functions like PR reviewing and repository indexing.

---

## Inngest Background Events

Inngest relies on uniquely named events to trigger functions in the background.

### `github/pr.review`
- **Payload**: `{ repoId: string, prNumber: number, installationId: string }`
- **Description**: Triggers the AI review process. Fetches the PR diff, retrieves codebase context using RAG, generates an AI response via Gemini, and posts the comment to GitHub.

### `github/repo.index` (Internal)
- **Payload**: `{ repoId: string, installationId: string }`
- **Description**: Triggers the background indexing pipeline. Downloads the repo, splits text into chunks, creates vector embeddings via Gemini, and stores them in the database.

---

## Prisma Database Commands

When developing locally, you will frequently use the following commands:

- `bunx prisma generate`: Regenerates the TypeScript client after modifying `schema.prisma`.
- `bunx prisma db push`: Pushes the schema state directly to the database without creating a formal migration (best for rapid prototyping).
- `bunx prisma migrate dev`: Creates a formal SQL migration file and applies it.
- `bunx prisma studio`: Opens a local web UI on port 5555 to manually inspect, edit, and delete database records.
