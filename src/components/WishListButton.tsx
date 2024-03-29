'use client'

import { addWishlisted, deleteWishlisted } from '@/services/graphql'
import { libro } from '@/types/libro'
import { userType } from '@/types/user'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-hot-toast'

export default function WishListButton({ libro, user }: { libro: libro; user: userType | undefined }) {
    const [isWishListed, setIsWishListed] = useState(
        user !== undefined && libro.usuariosDeseados.find(u => user.idUsuario === u.idUsuario) !== undefined
    )
    const router = useRouter()

    function toggleWishlist() {
        if (!user) {
            router.push('/ingresar')
            return
        }
        setIsWishListed(prev => !prev)
        if (isWishListed) {
            deleteWishlisted(libro.idLibro, user.idUsuario)
                .then(() => toast.success(`Se eliminó "${libro.titulo}" de tu lista de deseos`))
                .catch(() => toast.error(`No se pudo eliminar "${libro.titulo}" de tu lista de deseos`))
        } else {
            addWishlisted(libro.idLibro, user.idUsuario)
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
