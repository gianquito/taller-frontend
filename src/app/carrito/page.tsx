'use client'

import BlackButton from '@/components/BlackButton'
import ProductCart from '@/components/ProductCart'
import useClientAuth from '@/hooks/useAuth'
import { getProductsInCart } from '@/services/graphql'
import { ejemplar } from '@/types/ejemplar'
import { formatPrice } from '@/utils'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { verificarStock } from '@/utils'

export default function Carrito() {
    const user = useClientAuth()
    const [products, setProducts] = useState<{ cantidad: number; ejemplar: ejemplar }[]>([])
    const [amounts, setAmounts] = useState<{ [id: string]: { amount: number; price: number } }>({})
    const [subtotal, setSubtotal] = useState(0)
    const router = useRouter()

    function fetchProducts() {
        if (!user) return
        getProductsInCart(user.idCarrito, user.sessionId)
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

    async function handleCheckout() {
        if (!user) {
            router.push('/ingresar')
            return
        }
        const CartProducts: { cantidad: number; ejemplar: ejemplar }[] = await getProductsInCart(
            user.idCarrito,
            user.sessionId
        )
        setProducts(CartProducts)
        try {
            await verificarStock(CartProducts) // Pasar los productos al verificarStock
            router.push('/checkout')
        } catch (error) {
            console.error('Error al verificar el stock o al pasar a checkout:', error)
        }
    }

    if (!user) return null

    return (
        <div>
            <div className="mt-8 flex flex-col items-center justify-evenly lg:flex-row">
                <div className="mb-12 flex flex-col gap-4">
                    <h1 className="self-start text-4xl font-semibold tracking-tighter">Carrito</h1>
                    {products.length ? (
                        products.map(({ cantidad, ejemplar }) => (
                            <ProductCart
                                ejemplar={ejemplar}
                                title={ejemplar.libro.titulo}
                                author={ejemplar.libro.autores[0].autor.nombreAutor}
                                price={ejemplar.precio}
                                image={atob(ejemplar.libro.imagen)}
                                amount={cantidad}
                                key={ejemplar.isbn}
                                id={ejemplar.isbn}
                                cart_id={user.idCarrito}
                                stock={ejemplar.stock}
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
                    <BlackButton
                        text="Continuar"
                        onClick={handleCheckout}
                        disabled={products.length === 0}
                        disabledText="Continuar"
                    />
                </div>
            </div>
        </div>
    )
}
