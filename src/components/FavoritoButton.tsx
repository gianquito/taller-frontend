'use client'

import { useAuth } from '@/context/authContext'
import { addFavorite, deleteFavorite } from '@/services/graphql'
import { userType } from '@/types/user'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

export default function FavoritoButton({ libro }: any) {
    const { user, isAuthenticated } = useAuth()
    const [isFavorite, setIsFavorite] = useState(false)
    const router = useRouter()

    useEffect(() => {
        setIsFavorite(isAuthenticated && libro.usuariosFavoritos.find((u: userType) => user.idUsuario === u.idUsuario))
    }, [user])

    function toggleFavorite() {
        if (!isAuthenticated) {
            router.push('/ingresar')
            return
        }
        setIsFavorite(prev => !prev)
        if (isFavorite) {
            deleteFavorite(libro.isbn, user.idUsuario)
                .then(() => toast.success(`Se eliminó "${libro.titulo}" de tus favoritos`))
                .catch(() => toast.error(`No se pudo eliminar "${libro.titulo}" de tus favoritos`))
        } else {
            addFavorite(libro.isbn, user.idUsuario)
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
