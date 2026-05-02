# Usage Guide

This guide walks you through the day-to-day usage of Reposhield from the perspective of a developer or team lead.

## 1. Connecting Your Account
1. Visit the Reposhield homepage.
2. Click **Sign in with GitHub**.
3. Authorize the application. Better Auth will securely handle your session.

## 2. Linking a Repository
Before Reposhield can review your code, it needs permission to see it.
1. Navigate to the **Dashboard**.
2. Click **Add Repository**.
3. Select the GitHub repository you wish to monitor. 
4. The system will prompt you to install the Reposhield GitHub App on that specific repository if you haven't already.
5. Once linked, the **Indexing Worker** will download the codebase and generate AI embeddings in the background.

## 3. Triggering a Review
Reposhield is fully automated! You don't need to click any buttons to get a code review.
1. Push code to your linked repository.
2. Open a **Pull Request** on GitHub.
3. Within 1-2 minutes, the Reposhield AI will automatically comment on your PR with structured feedback, including:
   - A summary of the changes.
   - Identified bugs or performance issues.
   - Security warnings.
   - Actionable code suggestions.

## 4. Checking Developer Insights
As your team opens PRs, Reposhield tracks everything.
1. Go to the **Insights** tab in the sidebar.
2. View your **7-Day Trend**. This shows if your team's code output (and review activity) is increasing or decreasing.
3. Check your **Earned Badges**. Did you catch a nasty bug? The AI will automatically award you badges like *Security Guardian* or *Data Loss Prevented* based on the severity of the issues found in your PRs.

## 5. Upgrading to Pro
Free users are limited to 5 repositories and 5 reviews per repository.
1. Click the **Subscription** tab.
2. Click **Upgrade to Pro**.
3. You will be securely redirected to a Polar.sh checkout page.
4. Upon successful payment, your account will instantly upgrade, granting you unlimited AI reviews and repository connections.
