'use client'

import { addFavorite, deleteFavorite } from '@/services/graphql'
import { libro } from '@/types/libro'
import { userType } from '@/types/user'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-hot-toast'

export default function FavoritoButton({ libro, user }: { libro: libro; user: userType | undefined }) {
    const [isFavorite, setIsFavorite] = useState(
        user !== undefined && libro.usuariosFavoritos.find(u => user.idUsuario === u.idUsuario) !== undefined
    )
    const router = useRouter()

    function toggleFavorite() {
        if (!user) {
            router.push('/ingresar')
            return
        }
        setIsFavorite(prev => !prev)
        if (isFavorite) {
            deleteFavorite(libro.idLibro, user.idUsuario)
                .then(() => toast.success(`Se eliminó "${libro.titulo}" de tus favoritos`))
                .catch(() => toast.error(`No se pudo eliminar "${libro.titulo}" de tus favoritos`))
        } else {
            addFavorite(libro.idLibro, user.idUsuario)
                .then(() => toast.success(`Se agregó "${libro.titulo}" a tus favoritos`))
                .catch(() => toast.error(`No se pudo agregar "${libro.titulo}" a tus favoritos`))
        }
    }

    return (
        <img
            className="h-8 cursor-pointer"
            src={isFavorite ? '/fav_lleno.png' : '/fav_vacio.png'}
            onClick={toggleFavorite}
        />
    )
}
