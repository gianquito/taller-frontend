'use client'

import { addProductToCart } from '@/services/graphql'
import BlackButton from './BlackButton'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { libro } from '@/types/libro'
import useClientAuth from '@/hooks/useAuth'

export default function AddToCartButton({ libro }: { libro: libro }) {
    const user = useClientAuth(true)
    const router = useRouter()
    return (
        <BlackButton
            className="mt-6"
            text="Agregar al Carrito"
            disabled={libro.stock <= 0}
            disabledText="Sin stock"
            onClick={() => {
                !user
                    ? router.push('/ingresar')
                    : addProductToCart(libro.isbn, user.idCarrito)
                          .then(() => toast.success(`Se agregó ${libro.titulo} al carrito`))
                          .catch(() => toast.error(`No se pudo agregar ${libro.titulo} al carrito`))
            }}
        />
    )
}
