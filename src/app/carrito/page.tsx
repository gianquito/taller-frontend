'use client'

import BlackButton from '@/components/BlackButton'
import ProductCart from '@/components/ProductCart'
import { useAuth } from '@/context/authContext'
import { getProductsInCart } from '@/services/graphql'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Carrito() {
    const { user, isAuthenticated } = useAuth()
    const [products, setProducts] = useState<any[]>([])
    const router = useRouter()

    function fetchProducts() {
        getProductsInCart(user.idCarrito)
            .then(p => setProducts(p))
            .catch(() => router.push('/ingresar'))
    }

    useEffect(() => {
        if (!products.length && !user) return
        fetchProducts()
    }, [user])

    return (
        <div>
            <div className="mt-8 flex flex-col items-center justify-evenly lg:flex-row">
                <div className="flex flex-col gap-4">
                    <h1 className="self-start text-4xl font-semibold tracking-tighter">Carrito</h1>
                    {products.length ? (
                        products.map(product => (
                            <ProductCart
                                title={product.libro.titulo}
                                author={product.libro.autores[0].autor.nombreAutor}
                                price={product.libro.precio}
                                image={atob(product.libro.imagen)}
                                amount={product.cantidad}
                                key={product.libro.isbn}
                                id={product.libro.isbn}
                                cart_id={user.idCarrito}
                                stock={product.libro.stock}
                                fetch_products={fetchProducts}
                            />
                        ))
                    ) : (
                        <p>Tu carrito está vacio</p>
                    )}
                </div>
                <div className="my-12 ml-4 flex w-max flex-col justify-center gap-12 lg:my-0">
                    <p className="text-2xl font-semibold">Resumen</p>
                    <div className="flex w-80 flex-col gap-2 sm:w-96">
                        <div className="flex justify-between">
                            <p>Subtotal</p>
                            <p>$198</p>
                        </div>
                        <div className="h-0.5 bg-black"></div>
                        <div className="flex  justify-between">
                            <p>Total</p>
                            <p>$198</p>
                        </div>
                    </div>
                    <BlackButton text="Continuar" />
                </div>
            </div>
        </div>
    )
}
