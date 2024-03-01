'use client'

import { getGeneros } from '@/services/graphql'
import { removeURLParameter } from '@/utils'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

export default function GeneroFilter({ genero }: { genero: string | undefined }) {
    const [generos, setGeneros] = useState<{ nombreGenero: string; idGenero: string }[]>([])
    const [generoFilter, setGeneroFilter] = useState(genero ?? 'Todos')
    const router = useRouter()
    const searchParams = useSearchParams()

    useEffect(() => {
        getGeneros().then(generos => setGeneros(generos))
    }, [])

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())
            params.set(name, value)

            return params.toString()
        },
        [searchParams]
    )

    useEffect(() => {
        const location = document.location
        if (generoFilter === 'Todos') {
            if (searchParams.get('genero') === null) return

            router.push(removeURLParameter(location.href, 'genero'))
            return
        }
        router.push(`${location.origin + location.pathname}?${createQueryString('genero', generoFilter)}`)
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
