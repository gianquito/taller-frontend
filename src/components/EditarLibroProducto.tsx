'use client'
import { useAuth } from '@/context/authContext'
import Link from 'next/link'

export default function EditarLibroProducto({ isbn }: { isbn: number }) {
    const { user, isAuthenticated } = useAuth()

    if (!isAuthenticated || user.rol !== 1) return null
    return (
        <Link href={`/nuevo-libro/${isbn}`}>
            <img className="h-5" src="/lapiz1.png" />
        </Link>
    )
}
