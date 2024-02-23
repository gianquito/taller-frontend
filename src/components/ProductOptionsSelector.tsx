'use client'

import { ejemplar } from '@/types/ejemplar'
import { libro } from '@/types/libro'
import { usePathname, useRouter } from 'next/navigation'

export default function ProductOptionsSelector({
    libro,
    currentEjemplar,
}: {
    libro: libro
    currentEjemplar: ejemplar
}) {
    const pathname = usePathname()
    const router = useRouter()

    return (
        <div className="flex flex-col gap-1 text-sm text-neutral-500">
            <div>
                <p>Editorial: </p>
                <div className="mt-0.5 flex gap-3">
                    {libro.ejemplares.map(ejemplar => (
                        <button
                            key={ejemplar.editorial.nombreEditorial}
                            className={`rounded-lg border px-3 py-1 text-sm hover:border-black hover:bg-neutral-300 ${
                                currentEjemplar.editorial.nombreEditorial === ejemplar.editorial.nombreEditorial
                                    ? 'border-black text-black'
                                    : 'border-neutral-400'
                            }`}
                            onClick={() => {
                                router.replace(pathname + '?ejemplar=' + ejemplar.isbn)
                            }}
                        >
                            {ejemplar.editorial.nombreEditorial}
                        </button>
                    ))}
                </div>
            </div>
            <div>
                <p>Encuadernado: </p>
                <div className="mt-0.5 flex gap-3">
                    {libro.ejemplares.map(ejemplar => (
                        <button
                            key={ejemplar.encuadernado.tipo}
                            className={`rounded-lg border px-3 py-1 text-sm hover:border-black hover:bg-neutral-300 ${
                                currentEjemplar.encuadernado.tipo === ejemplar.encuadernado.tipo
                                    ? 'border-black text-black'
                                    : 'border-neutral-400'
                            }`}
                            onClick={() => {
                                router.replace(pathname + '?ejemplar=' + ejemplar.isbn)
                            }}
                        >
                            {ejemplar.encuadernado.tipo}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}
