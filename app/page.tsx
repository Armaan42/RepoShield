import { requireAuth } from "@/module/auth/utils/auth-utils";
import { redirect } from "next/navigation";
import { Suspense } from "react";

async function AuthGuard() {
  await requireAuth();
  redirect('/dashboard');
}

export default function Home() {
  return (
    <Suspense fallback={null}>
      <AuthGuard />
    </Suspense>
  )
}