'use client'

import { useEffect, useState } from 'react'
import BlackButton from './BlackButton'
import StarsInput from './StarsInput'
import { addReview, getPedidosByUser, getReview } from '@/services/graphql'
import toast from 'react-hot-toast'
import { ejemplar } from '@/types/ejemplar'
import { useRouter } from 'next/navigation'
import { userType } from '@/types/user'

interface ReviewFormProps {
    idLibro: number
    user: userType | undefined
}

export default function ReviewForm({ idLibro, user }: ReviewFormProps) {
    const [selectedRating, setSelectedRating] = useState<0 | 1 | 2 | 3 | 4 | 5>(0)
    const [ratingText, setRatingText] = useState('')
    const [showForm, setShowForm] = useState(false)

    const router = useRouter()

    function hasPedido(pedidos: any[]) {
        for (let i = 0; i < pedidos.length; i++) {
            if (pedidos[i].lineasPedido.find((lp: { ejemplar: ejemplar }) => lp.ejemplar.libro.idLibro === idLibro)) {
                return true
            }
        }
        return false
    }

    useEffect(() => {
        if (!user) return
        getReview(idLibro, user.idUsuario).then(reviews => {
            if (reviews.length > 0) return
            getPedidosByUser(user.idUsuario).then(pedidos => {
                pedidos.length && hasPedido(pedidos) && setShowForm(true)
            })
        })
    }, [user])
    if (!user || !showForm) return null

    return (
        <div className="xl:w-[700px]">
            <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between">
                <p className="font-medium">Deja tu reseña</p>
                <StarsInput selectedRating={selectedRating} setSelectedRating={setSelectedRating} />
            </div>
            <textarea
                className="mt-1 h-64 w-full border border-black px-2 py-1 font-medium outline-none"
                value={ratingText}
                onChange={e => setRatingText(e.target.value)}
            />
            <BlackButton
                text="Enviar"
                className="float-right !w-32 !py-3"
                disabled={!selectedRating || ratingText.length == 0}
                disabledText="Enviar"
                onClick={() =>
                    addReview(idLibro, user.idUsuario, ratingText, selectedRating)
                        .then(() => {
                            toast.success('Se agregó tu reseña')
                            setShowForm(false)
                            router.refresh()
                        })
                        .catch(() => toast.error('Error al agregar reseña'))
                }
            />
        </div>
    )
}
