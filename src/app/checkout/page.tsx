'use client'

import BlackButton from '@/components/BlackButton'
import CheckoutAdress from '@/components/CheckoutAdress'
import ProductCheckout from '@/components/ProductCheckout'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export default function Checkout() {
    const [selectedAdress, setSelectedAdress] = useState<number | null>(null)
    const router = useRouter()

    function handlePayment() {
        fetch('http://localhost:3000/pago', {
            method: 'POST',
            body: JSON.stringify({
                products: [
                    {
                        quantity: 1,
                        unit_price: 60,
                    },
                ],
            }),
        })
            .then(res => res.text())
            .then(payment_url => router.push(payment_url))
            .catch(() => toast.error('Error al crear pago'))
    }

    return (
        <div className="flex w-screen justify-center lg:block">
            <div className="mt-8 flex flex-col items-center justify-evenly lg:flex-row">
                <div className="flex flex-col gap-4">
                    <h1 className="self-start text-4xl font-semibold tracking-tighter">Checkout</h1>
                    <div className="flex items-center justify-center gap-4">
                        <p className="font-bold">Envío</p>
                        <div className="h-[1px] w-16 bg-black"></div>
                        <p>Pago</p>
                    </div>
                    <div className="mt-6 flex flex-col gap-4">
                        <CheckoutAdress
                            calle="9 de Julio"
                            numero={389}
                            cp={3260}
                            ciudad="Concepcion del Uruguay"
                            isSelected={selectedAdress === 123}
                            toggle={() => (selectedAdress === 123 ? setSelectedAdress(null) : setSelectedAdress(123))}
                        />
                        <CheckoutAdress
                            calle="9 de Julio"
                            numero={389}
                            cp={3260}
                            ciudad="Concepcion del Uruguay"
                            isSelected={selectedAdress === 456}
                            toggle={() => (selectedAdress === 456 ? setSelectedAdress(null) : setSelectedAdress(456))}
                        />
                        <Link href="/mi-cuenta" className="text-sm underline">
                            Editar direcciones
                        </Link>
                        <BlackButton className="mt-6" text="Continuar al pago" onClick={handlePayment} />
                    </div>
                </div>
                <div className="mt-10 flex flex-col items-center gap-4">
                    <p className="mb-2 self-start text-xl">Tu carrito</p>
                    <ProductCheckout
                        title="Harry Potter y la piedra filosofal"
                        author="J. K. Rowling"
                        price={99}
                        image="https://images.bajalibros.com/MBod5kOZT6hAhICPJ13UP40PLug=/fit-in/140x216/filters:fill(f8f8f8):quality(90):format(webp)/d2d6tho5fth6q4.cloudfront.net/extast2145006_67697bbc4ce6c1a5bdd9b32492a918f4c76a6668.jpg"
                        amount={1}
                    />
                    <ProductCheckout
                        title="Harry Potter y la piedra filosofal"
                        author="J. K. Rowling"
                        price={99}
                        image="https://images.bajalibros.com/MBod5kOZT6hAhICPJ13UP40PLug=/fit-in/140x216/filters:fill(f8f8f8):quality(90):format(webp)/d2d6tho5fth6q4.cloudfront.net/extast2145006_67697bbc4ce6c1a5bdd9b32492a918f4c76a6668.jpg"
                        amount={1}
                    />
                    <div className="my-12 flex w-80 flex-col gap-2 sm:w-96">
                        <div className="flex justify-between">
                            <p>Subtotal</p>
                            <p>$198</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Envío</p>
                            <p>$1200</p>
                        </div>
                        <div className="h-0.5 bg-black"></div>
                        <div className="flex  justify-between">
                            <p>Total</p>
                            <p>$198</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
