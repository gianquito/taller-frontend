'use client'

import ProductCardFavorites from '@/components/ProductCardFavorites'
import { useAuth } from '@/context/authContext'
import { getFavoritos } from '@/services/graphql'
import { libro } from '@/types/libro'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

export default function Favoritos() {
    const { user, isAuthenticated } = useAuth()
    const router = useRouter()

    const [products, setProducts] = useState<{ libro: libro }[]>([])

    function fetchProducts() {
        getFavoritos(user.idUsuario)
            .then(products => setProducts(products))
            .catch(() => toast.error('Error al obtener tus favoritos'))
    }

    useEffect(() => {
        if (isAuthenticated === null) return
        if (isAuthenticated === false) {
            router.push('/')
            return
        }

        fetchProducts()
    }, [user, isAuthenticated])

    if (!isAuthenticated) return null

    return (
        <div className="my-8 flex flex-col flex-wrap items-center md:my-16">
            <div className="flex flex-col px-8 md:w-3/4 md:px-0">
                <h1 className="self-start text-4xl font-semibold tracking-tighter">Favoritos</h1>
                <div className="mt-6 flex flex-wrap justify-center gap-4 md:mt-10 md:justify-normal md:gap-8">
                    {!products.length && 'Tu lista de favoritos está vacia'}
                    {products.map(({ libro }) => (
                        <ProductCardFavorites
                            title={libro.titulo}
                            image={atob(libro.imagen)}
                            id={libro.isbn}
                            price={libro.precio}
                            author={libro.autores[0].autor.nombreAutor}
                            key={libro.isbn}
                            id_usuario={user.idUsuario}
                            fetch_products={fetchProducts}
                            libro={libro}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
