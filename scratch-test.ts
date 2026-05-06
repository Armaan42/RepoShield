import prisma from "./lib/db";
import { Octokit } from "octokit";

async function main() {
    const account = await prisma.account.findFirst({
        where: { providerId: "github" },
        orderBy: { createdAt: "desc" }
    });

    if (!account?.accessToken) {
        console.log("No github access token found in DB");
        return;
    }

    console.log("Token found. Checking scopes...");
    const octokit = new Octokit({ auth: account.accessToken });

    try {
        const { headers } = await octokit.rest.users.getAuthenticated();
        console.log("OAuth Scopes:", headers["x-oauth-scopes"]);

        // Try listing repos
        const { data: repos } = await octokit.rest.repos.listForAuthenticatedUser({ per_page: 1 });
        if (repos.length > 0) {
            const testRepo = repos[0];
            console.log("Testing listWebhooks on repo:", testRepo.full_name);
            const { data: hooks } = await octokit.rest.repos.listWebhooks({
                owner: testRepo.owner.login,
                repo: testRepo.name
            });
            console.log("Webhooks:", hooks.map(h => h.config.url));
        }
    } catch (e: any) {
        console.error("GitHub API Error:", e.message);
    }
}

main().catch(console.error);
