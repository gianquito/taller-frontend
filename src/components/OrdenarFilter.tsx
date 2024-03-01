'use client'
import React, { useState, useEffect, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { removeURLParameter } from '@/utils'

export default function OrdenarFilter({ orden }: { orden: string | undefined }) {
    const [sortOptions] = useState<string[]>(['Reseñas', 'Favoritos', 'A-Z'])
    const [sortBy, setSortBy] = useState(orden ?? 'Popular')
    const router = useRouter()
    const searchParams = useSearchParams()

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
        if (sortBy === 'Popular') {
            if (searchParams.get('orden') === null) return

            router.push(removeURLParameter(location.href, 'orden'))
            return
        }
        router.push(`${location.origin + location.pathname}?${createQueryString('orden', sortBy)}`)
    }, [sortBy])

    return (
        <div className="flex items-center border border-black px-3 py-2 md:mr-40">
            <p className="text-sm text-gray-600">Ordenar</p>
            <select className="max-w-[100px] outline-none" value={sortBy} onChange={e => setSortBy(e.target.value)}>
                <option value="Popular">Popular</option>
                {sortOptions.map(option => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    )
}
