"use client";
import { Button } from '@/components/ui/button';
import { signOut } from '@/lib/auth-client';
import React from 'react'
import { useRouter } from 'next/navigation';

const Logout = ({
        children,
        className
    }: {
        children: React.ReactNode,
        className?: string
    
}) => {
    const router = useRouter();
  return (
    <span 
      className={className!}
      onClick={async () => {
        await signOut({
          fetchOptions: {
            onSuccess: () => {
              router.push("/login");
            },
            onError: (error) => {
              console.log("Logout error", error);
            }
          }
        });
      }}
    >
      {children}
    </span>
  )
}

export default Logout