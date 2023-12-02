'use client'
import ProductCardWishlist from '@/components/ProductCardDeseos'
import { useAuth } from '@/context/authContext'
import { getUserById, getWishlist } from '@/services/graphql'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

export default function ListaDeseos({ params }: { params: { id: string } }) {
    const { user } = useAuth()
    const router = useRouter()
    const [products, setProducts] = useState<any[]>([])
    const [listUser, setListuser] = useState<{ nombre: string } | 'loading'>('loading')

    function fetchProducts() {
        getUserById(params.id).then(u => setListuser(u))
        getWishlist(params.id)
            .then(products => setProducts(products))
            .catch(() => toast.error('Error al obtener la lista de deseos'))
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    if (listUser === 'loading') return null
    if (!listUser) router.push('/')

    return (
        <div className="my-8 flex flex-col flex-wrap items-center md:my-16">
            <div className="flex flex-col px-8 md:w-3/4 md:px-0">
                <div className="flex justify-between">
                    <h1 className="self-start text-4xl font-semibold tracking-tighter">
                        Lista de deseos de {listUser?.nombre}
                    </h1>
                </div>
                <div className="mt-6 flex flex-wrap justify-center gap-4 md:mt-10 md:gap-8">
                    {!products.length && 'La lista de deseos está vacia'}
                    {products.map(({ libro }) => (
                        <ProductCardWishlist
                            title={libro.titulo}
                            image={atob(libro.imagen)}
                            id={libro.isbn}
                            price={libro.precio}
                            author={libro.autores[0].autor.nombreAutor}
                            key={libro.isbn}
                            id_usuario={user ? user.idUsuario : undefined}
                            fetch_products={fetchProducts}
                            libro={libro}
                            id_lista={params.id}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
