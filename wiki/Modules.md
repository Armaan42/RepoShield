# Module Breakdown & Architecture

Reposhield uses a strict **Feature-Module Architecture** to keep the Next.js `app/` directory clean and maintainable. Instead of mixing UI components, database calls, and AI logic in the same files, everything is separated by domain.

---

## 📂 Global Directory Structure

```text
reposhield/
├── app/                  # Next.js App Router (UI Routes & API endpoints)
├── components/           # Generic, reusable UI components (Buttons, Inputs, Modals)
├── inngest/              # Background job orchestrators and queue logic
├── lib/                  # Global utilities (Auth instance, Prisma client, Pinecone client)
├── module/               # ⚠️ Core Business Logic (The brain of the app)
├── prisma/               # Database schema and migration histories
├── public/               # Static assets (images, SVGs)
└── wiki/                 # Project documentation
```

---

## 🧩 The `/module` Directory (Domain Logic)

The `/module` directory is the most important part of the codebase. It contains specific folders for each major feature. **Rules of the module directory:**
1. UI components (`app/`) can import from `module/`.
2. `module/` can import from `lib/`.
3. `module/` should **never** import UI components.

### `module/ai`
Handles everything related to Large Language Models and Vector Search.
- **`actions/index.ts`**: Contains `reviewPullRequest()`, the function that checks usage limits and triggers the Inngest queue.
- **`lib/rag.ts`**: Contains the complex math and logic to chunk codebase files, generate embeddings via Gemini, and upsert them into Pinecone.

### `module/dashboard`
Powers the analytics and UI data aggregation.
- **`actions/insights.ts`**: Contains `getDeveloperInsights()`. This function aggregates hundreds of AI reviews, groups them by UTC date for Recharts, and parses the Markdown text to award Gamification Badges (e.g., matching "SQL Injection" to the "Security Guardian" badge).
- **`actions/index.ts`**: Simple data fetchers for recent reviews and active repositories.

### `module/payment`
Isolates all monetization logic.
- **`action/index.ts`**: Contains `syncSubscriptionStatus()`, forcing a manual check against the Polar.sh API to ensure a user's Free/Pro tier is perfectly synchronized with the database.
- **`lib/subscription.ts`**: Core utility functions like `canConnectRepository()` and `canCreateReview()`. These are heavily used as guardrails before executing expensive operations.

### `module/repository`
Handles the onboarding of new GitHub codebases.
- **`actions/index.ts`**: Functions to fetch a user's installed GitHub repositories and link them to the local PostgreSQL database.

---

## 🔄 Interaction Flows (How it all connects)

Reposhield relies on a strict flow of data between its modules to keep the UI fast while handling heavy AI computations in the background.

### 1. UI to Server Actions (The Dashboard Flow)
When a user visits a dashboard page (e.g., `/app/dashboard/insights/page.tsx`), the React Server Component directly calls a function from the `/module` directory.
- **Example Flow**: `InsightsPage` calls `getDeveloperInsights()`.
- **Interaction**: The `getDeveloperInsights` function uses `lib/auth.ts` to get the current user's session. It then uses `lib/db.ts` to query Prisma for the user's reviews. Finally, it formats the data and returns it to the UI component, which renders the Recharts graphs.
- **Core Rule**: UI components *never* talk directly to the database.

### 2. Webhooks to Background Workers (The Event Flow)
When GitHub fires a webhook, it must be acknowledged within 10 seconds, or GitHub will mark it as failed. 
- **Example Flow**: A developer opens a Pull Request. GitHub sends a POST request to `/api/webhooks/github`.
- **Interaction**: The webhook route validates the payload. Instead of processing the review there, it uses the Inngest client to dispatch an event: `inngest.send({ name: "github/pr.review" })`. The API route immediately returns `200 OK`.
- **Handoff**: The Inngest server receives this event and triggers the `generateReview` function on a separate thread.

### 3. The AI Review Pipeline (The Processing Flow)
Once the `generateReview` Inngest function starts running, it acts as an orchestrator across the modules.
- **Interaction 1 (Fetch)**: It uses Octokit to fetch the specific Git Diff (`.patch` file).
- **Interaction 2 (RAG Retrieval)**: It takes the changed code and uses the embedding functions in `module/ai` to query the Vector Database, retrieving the 5 most relevant codebase files to provide architectural context.
- **Interaction 3 (Generation)**: It combines the Git Diff and the RAG Context, and calls the Google Gemini model.
- **Interaction 4 (Commenting)**: Once Gemini returns the markdown review, the function writes the result to the Database and uses Octokit again to post the comment on the GitHub PR timeline.

### 4. Subscription State Syncing (The Payment Flow)
- **Interaction**: When a user upgrades, Polar.sh hits our `/api/webhooks/polar` route, which updates the user's `subscriptionTier` in Prisma.
- **Failsafe**: If the webhook fails or is delayed, the frontend `/app/dashboard/subscription/page.tsx` uses a React `useEffect` to manually call `syncSubscriptionStatus()` when the user is redirected back with `?success=true`.
