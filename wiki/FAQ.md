# FAQ & Troubleshooting

Running a complex application with webhooks and background jobs locally can sometimes be tricky. Here are solutions to the most common issues you might face.

## Webhooks / API Issues

### Q: I opened a Pull Request, but nothing happened. No review was posted.
**Troubleshooting steps:**
1. **Check ngrok**: Is your ngrok tunnel running? Did the URL expire or change?
2. **Check GitHub App**: Go to your GitHub App settings. Ensure the Webhook URL matches your *current* ngrok URL (e.g., `https://<your-id>.ngrok-free.app/api/webhook`).
3. **Check GitHub Logs**: In your GitHub App settings, go to "Advanced". Look at the "Recent Deliveries" tab. If there is a red `X`, click it to see the error response from your local server.
4. **Check Inngest**: Open the Inngest Dev Server UI (`http://127.0.0.1:8288`). See if the `github/pr.review` event was received and if the function started executing.

### Q: I get a "Blocking Route" or "Suspense" error in Next.js.
Next.js requires hooks like `useSearchParams()` to be wrapped in a React `<Suspense>` boundary. If you see this error, ensure the component reading the URL params is wrapped:
```tsx
<Suspense fallback={<Spinner />}>
  <YourComponent />
</Suspense>
```

## AI / Generation Issues

### Q: Inngest throws an `AI_RetryError` or "Quota Exceeded".
**A:** This means you have hit the rate limit for your Google Gemini API key. 
- Inngest will automatically try to retry the job later using exponential backoff.
- To fix it permanently, you may need to add a billing account to your Google AI Studio account, or wait until your quota resets.

### Q: The AI review doesn't seem to understand the context of my project.
**A:** This usually means the repository wasn't fully indexed, or the Vector Database is empty. Ensure the `github/repo.index` Inngest job ran successfully when you first linked the repository on the dashboard.

## Database Issues

### Q: I get a "PrismaClientInitializationError" or "Can't reach database server".
**A:** Your `DATABASE_URL` in `.env` is incorrect, or your Postgres server isn't running. Double-check your connection string.

### Q: Console Warning: `SECURITY WARNING: The SSL modes 'prefer', 'require'... are treated as aliases for 'verify-full'`
**A:** This is a known warning with the Prisma/Postgres driver. To fix it, append `?sslmode=verify-full` to the very end of your `DATABASE_URL` in your `.env` file.

## Authentication Issues

### Q: Better Auth throws "Invalid Origin" or redirects to `localhost:3000` when logging in via ngrok.
**A:** Better Auth requires you to explicitly trust external origins. Ensure your `auth.ts` file includes your ngrok URL in the `trustedOrigins` array, or set the `BETTER_AUTH_URL` environment variable to your ngrok URL while developing locally.
