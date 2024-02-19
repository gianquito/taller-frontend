import { getSsrUser } from '@/ssrUtils'
import Link from 'next/link'

export default async function EditarLibroProducto({ isbn }: { isbn: number }) {
    const user = await getSsrUser()

    if (!user || user.rol !== 1) return null
    return (
        <Link href={`/nuevo-libro/${isbn}`}>
            <img className="h-5" src="/lapiz1.png" />
        </Link>
    )
}
