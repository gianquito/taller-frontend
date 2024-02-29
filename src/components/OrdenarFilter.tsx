'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'

export default function OrdenarFilter({ orden }: { orden: string | undefined }) {
  const [sortOptions] = useState<string[]>(['Reseñas', 'Favoritos', 'A-Z']);
  const [sortBy, setSortBy] = useState(orden ?? 'Popular')
  const router = useRouter()

  useEffect(() => {
    const location = document.location
    if (sortBy === 'Popular') {
        if (location.search === '') return
        router.push(location.origin + location.pathname)
        return
    }
    router.push(`${location.origin + location.pathname}?orden=${sortBy}`)
}, [sortBy])


  return (
    <div className="flex items-center border border-black px-3 py-2">
      <p className="text-sm text-gray-600">Ordenar</p>
      <select
        className="max-w-[100px] outline-none"
        value={sortBy}
        onChange={e => setSortBy(e.target.value)}
      >
        <option value="Popular">Popular</option>
        {sortOptions.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

