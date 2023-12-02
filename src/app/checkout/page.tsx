'use client'

import BlackButton from '@/components/BlackButton'
import CheckoutAddress from '@/components/CheckoutAddress'
import ProductCheckout from '@/components/ProductCheckout'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { getDirecciones, getProductsInCart } from '@/services/graphql'
import { useAuth } from '@/context/authContext'
import { calculateDiscount, formatPrice } from '@/utils'

export default function Checkout() {
    const [selectedAddress, setSelectedAddress] = useState<number | null>(null)
    const [cartProducts, setCartProducts] = useState([])
    const router = useRouter()
    const { user, isAuthenticated } = useAuth()
    const [subtotal, setSubtotal] = useState(0)
    const [addresses, setAddresses] = useState([])
    const [costoEnvios, setCostoEnvios] = useState<any>({})

    function handlePayment() {
        if (!user) {
            router.push('/ingresar')
            return
        }
        if (selectedAddress === null) {
            toast.error('Debe seleccionar una direccíon para el envío')
            return
        }
        if (!costoEnvios.hasOwnProperty(selectedAddress)) return

        fetch('/pago', {
            method: 'POST',
            body: JSON.stringify({
                products: cartProducts.map((product: any) => ({
                    quantity: product.cantidad,
                    unit_price: product.libro.precio,
                    title: product.libro.titulo,
                    id: product.libro.isbn,
                    currency_id: 'ARS',
                })),
                envio: costoEnvios[selectedAddress],
                id_usuario: user.idUsuario,
            }),
        })
            .then(res => res.text())
            .then(payment_url => router.push(payment_url))
            .catch(() => toast.error('Error al crear pago'))
    }

    useEffect(() => {
        if (isAuthenticated === null) return
        if (isAuthenticated === false) {
            router.push('/ingresar')
            return
        }
        getProductsInCart(user.idCarrito).then(p => (p.length ? setCartProducts(p) : router.push('/')))
        getDirecciones(user.idUsuario)
            .then(add => setAddresses(add))
            .catch(() => router.push('/ingresar'))
    }, [user, isAuthenticated])

    useEffect(() => {
        let acc = 0
        cartProducts.forEach((p: any) => {
            const discount = calculateDiscount(p.libro)
            acc += p.cantidad * (discount.hasDiscount ? discount.discountedPrice : p.libro.precio)
        })
        setSubtotal(acc)
    }, [cartProducts])

    if (!isAuthenticated) return null

    return (
        <div className="flex w-full justify-center lg:block">
            <div className="my-8 flex flex-col items-center justify-evenly lg:flex-row">
                <div className="flex flex-col gap-4">
                    <h1 className="self-start text-4xl font-semibold tracking-tighter">Checkout</h1>
                    <div className="flex items-center justify-center gap-4">
                        <p className="font-bold">Envío</p>
                        <div className="h-[1px] w-16 bg-black"></div>
                        <p>Pago</p>
                    </div>
                    <div className="mt-6 flex flex-col gap-4">
                        <CheckoutAddress
                            local
                            calle="9 de Julio"
                            numero={389}
                            ciudad="Concepcion del Uruguay"
                            cp={3260}
                            id={-1}
                            isSelected={selectedAddress === -1}
                            setCostoEnvios={setCostoEnvios}
                            key={-1}
                            toggle={() => (selectedAddress === -1 ? setSelectedAddress(null) : setSelectedAddress(-1))}
                        />
                        {addresses.map((dir: any) => (
                            <CheckoutAddress
                                calle={dir.calle}
                                numero={dir.numero}
                                cp={dir.cpCiudad}
                                ciudad={dir.ciudad.nombreCiudad}
                                isSelected={selectedAddress === dir.idDireccion}
                                toggle={() =>
                                    selectedAddress === dir.idDireccion
                                        ? setSelectedAddress(null)
                                        : setSelectedAddress(dir.idDireccion)
                                }
                                key={dir.idDireccion}
                                setCostoEnvios={setCostoEnvios}
                                id={dir.idDireccion}
                            />
                        ))}
                        <Link href="/mi-cuenta" className="text-sm underline">
                            Editar direcciones
                        </Link>
                        <BlackButton className="mt-6" text="Continuar al pago" onClick={handlePayment} />
                    </div>
                </div>
                <div className="mt-10 flex flex-col items-center gap-4">
                    <p className="mb-2 self-start text-xl">Tu carrito</p>
                    {cartProducts.map((product: any) => (
                        <ProductCheckout
                            title={product.libro.titulo}
                            author={product.libro.autores[0].autor.nombreAutor}
                            price={product.libro.precio}
                            image={atob(product.libro.imagen)}
                            amount={product.cantidad}
                            key={product.libro.isbn}
                            libro={product.libro}
                        />
                    ))}
                    <div className="my-12 flex w-80 flex-col gap-2 sm:w-96">
                        <div className="flex justify-between">
                            <p>Subtotal</p>
                            <p>{formatPrice(subtotal)}</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Envío</p>
                            <p>
                                {selectedAddress && costoEnvios.hasOwnProperty(selectedAddress)
                                    ? formatPrice(costoEnvios[selectedAddress])
                                    : '$0'}
                            </p>
                        </div>
                        <div className="h-0.5 bg-black"></div>
                        <div className="flex  justify-between">
                            <p>Total</p>
                            <p>
                                {selectedAddress && costoEnvios.hasOwnProperty(selectedAddress)
                                    ? formatPrice(subtotal + costoEnvios[selectedAddress])
                                    : formatPrice(subtotal)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
