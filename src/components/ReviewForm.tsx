'use client'

import { useEffect, useState } from 'react'
import BlackButton from './BlackButton'
import StarsInput from './StarsInput'
import { addReview, getPedidos, getPedidosByUser } from '@/services/graphql'
import { useAuth } from '@/context/authContext'

interface ReviewFormProps {
    isbn: number
}

export default function ReviewForm({ isbn }: ReviewFormProps) {
    const [selectedRating, setSelectedRating] = useState<0 | 1 | 2 | 3 | 4 | 5>(0)
    const [ratingText, setRatingText] = useState('')
    const [showForm, setShowForm] = useState(false)

    const { user, isAuthenticated } = useAuth()
    useEffect(() => {
        if (isAuthenticated === null) return
        getPedidosByUser(user.idUsuario).then(pedidos => {
            pedidos.length &&
                pedidos.lineaPedido.find((lp: { idLibro: number }) => lp.idLibro === isbn) &&
                setShowForm(true)
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
                onClick={() => addReview(isbn, user.idUsuario, ratingText, selectedRating)}
            />
        </div>
    )
}
