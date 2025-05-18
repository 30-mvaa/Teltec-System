"use client"

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export function RouteGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  useEffect(() => {
    const isLoggedIn = false // reemplaza con tu lógica real
    if (!isLoggedIn) {
      router.push('/login')
    }
  }, [router])

  return <>{children}</>
}


