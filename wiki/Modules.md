# Module Breakdown

Reposhield is organized into several distinct modules to keep the codebase clean and maintainable. This project relies heavily on Next.js App Router conventions.

## Directory Structure

```text
reposhield/
├── app/                  # Next.js App Router (Pages & Layouts)
│   ├── api/              # HTTP API endpoints (Webhooks, Inngest)
│   ├── dashboard/        # Authenticated dashboard UI
│   └── page.tsx          # Public landing page
├── components/           # Reusable React components (Shadcn UI)
├── inngest/              # Background jobs and event definitions
├── lib/                  # Core utility functions (Auth, DB, AI)
├── module/               # Feature-based domain logic (Server Actions)
├── prisma/               # Database schema and migrations
└── wiki/                 # Project documentation
```

---

## Detailed Breakdown

### `/app`
This directory handles routing and the visible user interface.
- `/app/api`: Contains the webhook receivers (`/webhook`, `/webhooks/polar`) and the Inngest handler (`/inngest/route.ts`).
- `/app/dashboard`: Contains the main layout (`layout.tsx`), the overview page (`page.tsx`), the subscription management page (`/subscription/page.tsx`), and the developer performance graphs (`/insights/page.tsx`).

### `/module`
We use a feature-module pattern to separate server-side business logic from the UI.
- **`module/dashboard/actions`**: Contains Next.js Server Actions. For example, `insights.ts` holds the `getDeveloperInsights` function which aggregates Prisma review data, calculates weekly trends, and maps AI review text to dynamic performance badges.
- **`module/payment`**: Contains functions to interact with Polar.sh, including creating checkout sessions and syncing subscription status.

### `/lib`
Core configuration and singletons.
- **`auth.ts` / `auth-client.ts`**: Better Auth configuration for GitHub OAuth, session management, and database adapter setup.
- **`db.ts`**: The Prisma client singleton instance.
- **`ai.ts`**: Initialization and helper functions for the Vercel AI SDK and Google Gemini.

### `/inngest`
The heart of the asynchronous engine.
- **`client.ts`**: Initializes the Inngest client.
- **`functions.ts`**: Contains the heavy background tasks, primarily the `generateReview` function which orchestrates fetching the GitHub diff, querying the vector database, prompting Gemini, and posting the final comment back to GitHub.

### `/prisma`
- **`schema.prisma`**: The source of truth for the database schema. Defines the `User`, `Repository`, `Review`, and `UserUsage` models, as well as the relationships between them.
