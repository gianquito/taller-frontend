'use client'

import { addPreguntaFrecuente } from '@/services/graphql'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import BlackButton from './BlackButton'
import toast from 'react-hot-toast'
import { userType } from '@/types/user'

export default function CargarPreguntaFrecuente({ user }: { user: userType | undefined }) {
    const [nuevaPregunta, setNuevaPregunta] = useState({ pregunta: '', respuesta: '' })
    const router = useRouter()

    if (!user || user.rol != 1) return null

    return (
        <div className="flex w-full flex-col gap-3">
            <p className="font-medium">Nueva pregunta</p>

            <input
                className="border border-black px-5 py-3"
                placeholder="Pregunta"
                value={nuevaPregunta.pregunta}
                onChange={e => setNuevaPregunta({ ...nuevaPregunta, pregunta: e.target.value })}
            />
            <input
                className="border border-black px-5 py-3"
                placeholder="Respuesta"
                value={nuevaPregunta.respuesta}
                onChange={e => setNuevaPregunta({ ...nuevaPregunta, respuesta: e.target.value })}
            />
            <BlackButton
                text="Agregar pregunta"
                className="!w-52 self-end !py-3"
                disabled={!nuevaPregunta.pregunta || !nuevaPregunta.respuesta}
                disabledText="Agregar pregunta"
                onClick={() =>
                    addPreguntaFrecuente(nuevaPregunta.pregunta, nuevaPregunta.respuesta)
                        .then(() => {
                            toast.success('Se agregó la nueva pregunta')
                            router.refresh()
                            setNuevaPregunta({ pregunta: '', respuesta: '' })
                        })
                        .catch(() => toast.error('Error al agregar pregunta'))
                }
            />
        </div>
    )
}
