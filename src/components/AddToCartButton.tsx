'use client'

import { addProductToCart } from '@/services/graphql'
import BlackButton from './BlackButton'
import { useAuth } from '@/context/authContext'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

export default function AddToCartButton({ libro }: any) {
    const { user, isAuthenticated } = useAuth()
    const router = useRouter()
    return (
        <BlackButton
            className="mt-6"
            text="Agregar al Carrito"
            disabled={libro.stock <= 0}
            onClick={() => {
                !isAuthenticated
                    ? router.push('/ingresar')
                    : addProductToCart(libro.isbn, user.idCarrito)
                          .then(() => toast.success(`Se agregó ${libro.titulo} al carrito`))
                          .catch(() => toast.error(`No se pudo agregar ${libro.titulo} al carrito`))
            }}
        />
    )
}
