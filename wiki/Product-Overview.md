# RepoShield Product Overview (Non-Technical)

This document covers the business logic, product vision, target audience, and non-technical aspects of RepoShield.

## 1. Product Vision & Value Proposition
**Vision:** To democratize access to high-quality code reviews, ensuring that every engineering team, regardless of size, can ship secure, bug-free code quickly.

**Value Proposition:** "Cut Code Review Time & Bugs in Half. Instantly."
RepoShield supercharges development teams by providing immediate, automated AI code reviews on every Pull Request. It acts as an always-on senior engineer that catches bugs, suggests performance improvements, and ensures coding standards are met before human reviewers even look at the code.

## 2. Target Audience
RepoShield is designed for:
- **Solo Developers & Freelancers:** Looking for a "second pair of eyes" to catch mistakes before deploying.
- **Open Source Maintainers:** Dealing with a high volume of PRs from external contributors and needing automated triage and quality checks.
- **Small to Medium Engineering Teams:** Wanting to reduce the bottleneck of senior engineers spending hours reviewing boilerplate or standard logic.
- **CTOs & Engineering Managers:** Seeking actionable insights on team productivity, code quality trends, and repository health over time.

## 3. Pricing Model & Monetization (Polar.sh)
RepoShield uses a freemium SaaS model managed via Polar.sh.

### Free Tier ("FREE")
- **Target:** Individuals and small open-source projects.
- **Limits:** 
  - Maximum of 3 connected GitHub repositories.
  - Maximum of 15 AI pull request reviews per month.
- **Features:** Standard AI reviews, basic dashboard insights.

### Pro Tier ("PRO")
- **Target:** Professional developers and engineering teams.
- **Price:** Managed dynamically in Polar.sh (Product ID: `ffdb0ccf-e07b-4e72-bb5a-ac85f3646e6a`).
- **Limits:** 
  - Unlimited connected GitHub repositories.
  - Unlimited AI pull request reviews.
- **Features:** Priority AI generation, full historical insights, unlimited repository tracking.

## 4. Core User Journey
1. **Onboarding:** User signs in via GitHub (OAuth). The platform immediately syncs their profile.
2. **Setup:** The user visits the `Repositories` tab and clicks "Connect" on the repos they want to monitor.
3. **Action:** A developer opens a Pull Request on a connected repository.
4. **Value Delivery:** RepoShield automatically detects the PR via GitHub Webhooks, processes the code diffs through AI (Google Gemini), and posts a structured, constructive review comment directly on GitHub.
5. **Insights:** The team lead logs into the RepoShield dashboard to view aggregate stats (total reviews, files analyzed, issues caught).

## 5. Brand Voice & Messaging
- **Tone:** Professional, reliable, forward-thinking, and empowering.
- **Design Aesthetic:** Dark mode by default, sleek, minimalistic, and "developer-first." The UI avoids clutter and focuses on actionable metrics.
- **Keywords:** Automated Code Review, AI Pair Programmer, Developer Productivity, Code Quality, Continuous Integration.

## 6. Competitive Advantage
Unlike traditional static analysis tools (e.g., SonarQube) that only look for syntax rules, RepoShield uses Generative AI (RAG with Pinecone & Google Gemini) to understand the *context* and *intent* of the code. It provides human-like feedback, catches logical errors, and suggests refactoring rather than just throwing linting errors.
