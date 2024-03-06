import { userType } from '@/types/user'
import Link from 'next/link'

export default function EditarLibroProducto({ idLibro, user }: { idLibro: number; user: userType | undefined }) {
    if (!user || user.rol !== 1) return null
    return (
        <Link href={`/gestion/nuevo-libro/${idLibro}`}>
            <img className="h-5" src="/lapiz1.png" />
        </Link>
    )
}
