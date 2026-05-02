# Contributing to Reposhield

First off, thank you for considering contributing to Reposhield! We welcome contributions from everyone, whether it's fixing a typo, adding a new feature, or improving the AI prompts.

## How to Contribute

### 1. Find an Issue
Check out the **Issues** tab on GitHub. Look for tags like `good first issue` or `help wanted`. If you have a new idea, please open an issue to discuss it before you start coding to ensure it aligns with the project's goals.

### 2. Fork and Clone
Fork the repository to your own GitHub account, then clone it locally:
```bash
git clone https://github.com/YOUR_USERNAME/reposhield.git
cd reposhield
git checkout -b feature/your-feature-name
```

### 3. Local Setup
Follow the steps in the [Installation Guide](Installation) to get your local database, Inngest server, and Next.js app running.

### 4. Make Your Changes
- **Keep it focused**: Try to keep your Pull Requests limited to a single feature or bug fix.
- **Follow conventions**: We use standard React functional components, Tailwind CSS for styling, and Next.js Server Actions for data fetching.
- **Type Safety**: Ensure your TypeScript types are accurate. Avoid using `any`.

### 5. Test Your Changes
Before submitting, ensure:
1. The app builds successfully (`bun run build`).
2. The UI looks correct in both Light and Dark modes.
3. If you changed AI logic, test it locally by opening a dummy PR on a linked repository via your ngrok tunnel.

### 6. Submit a Pull Request
1. Push your branch to your fork.
2. Open a Pull Request against the `main` branch of the official Reposhield repo.
3. Provide a clear description of what you changed, why you changed it, and include screenshots if you modified the UI.

## Coding Style Guidelines
- **Components**: Place reusable UI pieces in `/components`.
- **Server Actions**: Place business logic that talks to Prisma inside `/module/.../actions`. Do not put database calls directly in UI components.
- **Icons**: We use `lucide-react`.
- **Styling**: We strictly use Tailwind CSS utility classes. Avoid writing custom CSS unless absolutely necessary.

Thank you for helping make Reposhield better!
