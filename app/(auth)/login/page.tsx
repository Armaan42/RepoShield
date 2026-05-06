import React, { Suspense } from 'react'
import LoginUI from '@/module/auth/components/login-ui'
import { requireUnAuth } from '@/module/auth/utils/auth-utils'

async function AuthGuard({ children }: { children: React.ReactNode }) {
    await requireUnAuth();
    return <>{children}</>;
}

const LoginPage = () => {
    return (
        <Suspense fallback={null}>
            <AuthGuard>
                <LoginUI />
            </AuthGuard>
        </Suspense>
    )
}

export default LoginPage
