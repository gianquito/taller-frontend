'use client'

import GestionCards from '@/components/GestionCards'
import LibrosGestion from '@/components/LibrosGestion'
import PromocionGestion from '@/components/PromocionGestion'
import { useAuth } from '@/context/authContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Gestion() {
    const { user, isAuthenticated } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (isAuthenticated === null) return
        if (isAuthenticated === false || user.rol !== 1) {
            router.push('/')
            return
        }
    }, [user, isAuthenticated])

    if (!isAuthenticated || user.rol !== 1) return null

    return (
        <div>
            <div>
                <GestionCards />
            </div>
            <LibrosGestion />
            <PromocionGestion />
        </div>
    )
}
