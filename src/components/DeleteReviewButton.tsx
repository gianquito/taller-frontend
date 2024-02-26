'use client'

import { deleteReview } from '@/services/graphql'
import { userType } from '@/types/user'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

interface DeleteReviewButtonProps {
    user: userType | undefined
    reviewUser: { idUsuario: string; nombre: string; apellido: string }
    idLibro: number
}

export default function DeleteReviewButton({ user, reviewUser, idLibro }: DeleteReviewButtonProps) {
    const router = useRouter()

    if (!user || user.idUsuario !== reviewUser.idUsuario) return null

    function handleDeleteReview() {
        if (!user) return
        deleteReview(idLibro, user.idUsuario)
            .then(() => {
                toast.success('Se eliminó tu reseña')
                router.refresh()
            })
            .catch(() => toast.error('Error al eliminar reseña'))
    }

    return (
        <button className="w-max text-start underline" onClick={handleDeleteReview}>
            Eliminar
        </button>
    )
}
