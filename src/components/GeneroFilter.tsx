'use client'

import { getGeneros } from '@/services/graphql'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function GeneroFilter({ genero }: { genero: string | undefined }) {
    const [generos, setGeneros] = useState<{ nombreGenero: string; idGenero: string }[]>([])
    const [generoFilter, setGeneroFilter] = useState(genero ?? 'Todos')
    const router = useRouter()
    useEffect(() => {
        getGeneros().then(generos => setGeneros(generos))
    }, [])

    useEffect(() => {
        if (generoFilter === 'Todos') {
            router.push('/')
            return
        }
        router.push(`/?genero=${generoFilter}`)
    }, [generoFilter])

    return (
        <div className="flex items-center border border-black px-3 py-2">
            <p className="text-sm text-gray-600">Genero</p>
            <select
                className="max-w-[100px] outline-none"
                value={generoFilter}
                onChange={e => setGeneroFilter(e.target.value)}
            >
                <option value="Todos">Todos</option>
                {generos.map(genero => (
                    <option value={genero.nombreGenero} key={genero.nombreGenero}>
                        {genero.nombreGenero}
                    </option>
                ))}
            </select>
        </div>
    )
}
