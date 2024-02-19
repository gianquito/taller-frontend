'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function ClientNavigator({ route }: { route: string }) {
    const router = useRouter()
    useEffect(() => {
        router.push(route)
    }, [])
    return <></>
}
