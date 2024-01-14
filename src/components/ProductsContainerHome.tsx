'use client'

import { getGeneros, getProductsByName } from '@/services/graphql'
import ProductCardHome from './ProductCardHome'
import CargarLibroHome from './CargarLibroHome'
import { useEffect, useState } from 'react'
import { libro } from '@/types/libro'

export default function ProductsHome({ nombre }: { nombre?: string }) {
    const [products, setProducts] = useState<libro[]>([])
    const [generos, setGeneros] = useState<{ nombreGenero: string; idGenero: string }[]>([])
    const [generoFilter, setGeneroFilter] = useState('Todos')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getGeneros().then(generos => setGeneros(generos))
    }, [])

    useEffect(() => {
        getProductsByName(nombre ?? '').then(products => {
            setLoading(false)
            if (generoFilter === 'Todos') {
                setProducts(products)
                return
            }
            setProducts(
                products.filter(product => product.generos.find(({ genero }) => genero.nombreGenero === generoFilter))
            )
        })
    }, [generoFilter])

    if (loading) return null

    return (
        <div className="mb-12 mt-8 flex max-w-[1500px] flex-col gap-4">
            <div className="flex w-full justify-center gap-4 self-end md:w-max">
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
                <div className="flex items-center border border-black px-3 py-2 md:mr-40">
                    <p className="text-sm text-gray-600">Ordenar</p>
                    <select className="outline-none">
                        <option>Popular</option>
                        <option>Reseñas</option>
                        <option>A-Z</option>
                    </select>
                </div>
            </div>
            <div className="flex flex-wrap justify-center gap-8 px-2 md:px-24">
                <CargarLibroHome />
                {products
                    .filter(product => product.stock > 0)
                    .map(product => (
                        <>
                            <ProductCardHome
                                libro={product}
                                title={product.titulo}
                                image={atob(product.imagen)}
                                id={product.isbn}
                                price={product.precio}
                                author={product.autores[0].autor.nombreAutor}
                                key={product.isbn}
                            />
                        </>
                    ))}
            </div>
        </div>
    )
}
