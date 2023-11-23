'use client'

import { useAuth } from '@/context/authContext'
import Link from 'next/link'

export default function CargarHome() {
    const { user, isAuthenticated } = useAuth()

    if (!isAuthenticated || user.rol !== 1) return null
    return (
        <Link
            className="flex h-60 w-40 flex-col items-center justify-evenly gap-0.5 border-2 border-black leading-7"
            href={`/nuevo-libro`}
        >
            <img className="w-16" alt="cargar libro" src="/plus.png" />
            <p className="text-xl">Cargar Libro</p>
        </Link>
    )
}
