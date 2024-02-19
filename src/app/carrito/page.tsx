'use client'

import BlackButton from '@/components/BlackButton'
import ProductCart from '@/components/ProductCart'
import useClientAuth from '@/hooks/useAuth'
import { getProductsInCart } from '@/services/graphql'
import { libro } from '@/types/libro'
import { formatPrice } from '@/utils'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Carrito() {
    const user = useClientAuth()
    const [products, setProducts] = useState<{ cantidad: number; libro: libro }[]>([])
    const [amounts, setAmounts] = useState<{ [id: string]: { amount: number; price: number } }>({})
    const [subtotal, setSubtotal] = useState(0)

    const router = useRouter()

    function fetchProducts() {
        if (!user) return
        getProductsInCart(user.idCarrito)
            .then(p => setProducts(p))
            .catch(() => router.push('/ingresar'))
    }

    useEffect(() => {
        let acc = 0
        Object.keys(amounts).forEach(id => (acc += amounts[id].amount * amounts[id].price))
        setSubtotal(acc)
    }, [products, amounts])

    useEffect(() => {
        if (!user) return
        fetchProducts()
    }, [user])
    if (!user) return null
    return (
        <div>
            <div className="mt-8 flex flex-col items-center justify-evenly lg:flex-row">
                <div className="flex flex-col gap-4">
                    <h1 className="self-start text-4xl font-semibold tracking-tighter">Carrito</h1>
                    {products.length ? (
                        products.map(product => (
                            <ProductCart
                                libro={product.libro}
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
                                setAmounts={setAmounts}
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
                            <p>{formatPrice(subtotal)}</p>
                        </div>
                        <div className="h-0.5 bg-black"></div>
                        <div className="flex  justify-between">
                            <p>Total</p>
                            <p>{formatPrice(subtotal)}</p>
                        </div>
                    </div>
                    <Link href={`${products.length ? '/checkout' : '#'}`}>
                        <BlackButton text="Continuar" />
                    </Link>
                </div>
            </div>
        </div>
    )
}
