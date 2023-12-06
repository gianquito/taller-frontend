'use client'

import { useAuth } from '@/context/authContext'
import { addWishlisted, deleteWishlisted } from '@/services/graphql'
import { libro } from '@/types/libro'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

export default function WishListButton({ libro }: { libro: libro }) {
    const { user, isAuthenticated } = useAuth()
    const [isWishListed, setIsWishListed] = useState(false)
    const router = useRouter()

    useEffect(() => {
        setIsWishListed(
            isAuthenticated && libro.usuariosDeseados.find(u => user.idUsuario === u.idUsuario) !== undefined
        )
    }, [user])

    function toggleWishlist() {
        if (!isAuthenticated) {
            router.push('/ingresar')
            return
        }
        setIsWishListed(prev => !prev)
        if (isWishListed) {
            deleteWishlisted(libro.isbn, user.idUsuario)
                .then(() => toast.success(`Se eliminó "${libro.titulo}" de tu lista de deseos`))
                .catch(() => toast.error(`No se pudo eliminar "${libro.titulo}" de tu lista de deseos`))
        } else {
            addWishlisted(libro.isbn, user.idUsuario)
                .then(() => toast.success(`Se agregó "${libro.titulo}" a tu lista de deseos`))
                .catch(() => toast.error(`No se pudo agregar "${libro.titulo}" a tu lista de deseos`))
        }
    }

    return (
        <img
            className="h-8 cursor-pointer"
            src={isWishListed ? '/Wishlist_lleno.png' : '/Wishlist_vacio.png'}
            onClick={toggleWishlist}
        />
    )
}
