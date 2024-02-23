'use client'

import { addProductToCart } from '@/services/graphql'
import BlackButton from './BlackButton'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import useClientAuth from '@/hooks/useAuth'
import { ejemplar } from '@/types/ejemplar'

export default function AddToCartButton({ ejemplar, titulo }: { ejemplar: ejemplar; titulo: string }) {
    const user = useClientAuth(true)
    const router = useRouter()
    return (
        <BlackButton
            className="mt-6"
            text="Agregar al Carrito"
            disabled={ejemplar.stock <= 0}
            disabledText="Sin stock"
            onClick={() => {
                !user
                    ? router.push('/ingresar')
                    : addProductToCart(ejemplar.isbn, user.idCarrito)
                          .then(() => toast.success(`Se agregó ${titulo} al carrito`))
                          .catch(() => toast.error(`No se pudo agregar ${titulo} al carrito`))
            }}
        />
    )
}
