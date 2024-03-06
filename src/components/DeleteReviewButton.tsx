'use client'

import { deleteReview } from '@/services/graphql'
import { userType } from '@/types/user'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

interface DeleteReviewButtonProps {
    user: userType | undefined
    reviewUser: { idUsuario: string; nombre: string; apellido: string }
    idLibro: number
    revalidate: (path: string) => Promise<void>
}

export default function DeleteReviewButton({ user, reviewUser, idLibro, revalidate }: DeleteReviewButtonProps) {
    const router = useRouter()

    if (!user || user.idUsuario !== reviewUser.idUsuario) return null

    function handleDeleteReview() {
        if (!user) return
        deleteReview(idLibro, user.idUsuario)
            .then(() => {
                toast.success('Se eliminó tu reseña')
                revalidate(`/libro/${idLibro}`)
                router.push(`/libro/${idLibro}`)
            })
            .catch(err => console.log(err))
    }

    return (
        <button className="w-max text-start underline" onClick={handleDeleteReview}>
            Eliminar
        </button>
    )
}
