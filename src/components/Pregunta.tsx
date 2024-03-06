'use client'

import { deletePreguntaFrecuente } from '@/services/graphql'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { userType } from '@/types/user'

interface PreguntaProps {
    pregunta: string
    respuesta: string
    id: number
    user: userType | undefined
}
export default function Pregunta({ pregunta, respuesta, id, user }: PreguntaProps) {
    const router = useRouter()

    return (
        <Accordion type="single" collapsible>
            <AccordionItem value="item-1" className="border border-black px-8">
                <AccordionTrigger className="font-semibold">{pregunta}</AccordionTrigger>
                <AccordionContent>
                    {respuesta}
                    {user && user.rol == 1 && (
                        <p
                            className="mt-1 cursor-pointer text-sm underline"
                            onClick={e => {
                                e.preventDefault()
                                deletePreguntaFrecuente(id)
                                    .then(() => {
                                        toast.success(`Se eliminó la pregunta frecuente`)
                                        router.refresh()
                                    })
                                    .catch(() => toast.error(`No se pudo eliminar la pregunta frecuente`))
                            }}
                        >
                            Eliminar
                        </p>
                    )}
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}
