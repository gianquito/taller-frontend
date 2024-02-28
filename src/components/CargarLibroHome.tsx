import { getSsrUser } from '@/ssrUtils'
import Link from 'next/link'

export default async function CargarHome() {
    const user = await getSsrUser()
    if (!user || user.rol != 1) return
    return (
        <Link
            className="flex h-60 w-40 flex-col items-center justify-evenly gap-0.5 border-2 border-black leading-7"
            href={`/gestion/nuevo-libro`}
        >
            <img className="w-16" alt="cargar libro" src="/plus.png" />
            <p className="text-xl">Cargar Libro</p>
        </Link>
    )
}
