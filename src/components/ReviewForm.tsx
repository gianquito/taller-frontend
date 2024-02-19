'use client'

import { useEffect, useState } from 'react'
import BlackButton from './BlackButton'
import StarsInput from './StarsInput'
import { addReview, getPedidosByUser } from '@/services/graphql'
import { useAuth } from '@/context/authContext'
import toast from 'react-hot-toast'

interface ReviewFormProps {
    isbn: number
}

export default function ReviewForm({ isbn }: ReviewFormProps) {
    const [selectedRating, setSelectedRating] = useState<0 | 1 | 2 | 3 | 4 | 5>(0)
    const [ratingText, setRatingText] = useState('')
    const [showForm, setShowForm] = useState(false)

    const { user, isAuthenticated } = useAuth()

    function hasPedido(pedidos: any[]) {
        for (let i = 0; i < pedidos.length; i++) {
            if (pedidos[i].lineasPedido.find((lp: { idLibro: number }) => lp.idLibro === isbn)) {
                return true
            }
        }
        return false
    }

    useEffect(() => {
        if (isAuthenticated === null) return
        if (!user) return
        getPedidosByUser(user.idUsuario).then(pedidos => {
            pedidos.length && hasPedido(pedidos) && setShowForm(true)
        })
    }, [user, isAuthenticated])
    if (!isAuthenticated || !showForm) return null

    return (
        <div>
            <div className="flex items-center justify-between">
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
                className="importan float-right w-32 !py-3"
                disabled={!selectedRating || ratingText.length == 0}
                disabledText="Enviar"
                onClick={() =>
                    addReview(isbn, user.idUsuario, ratingText, selectedRating)
                        .then(() => toast.success('Se agregó tu reseña'))
                        .catch(() => toast.error('Error al agregar reseña'))
                }
            />
        </div>
    )
}
