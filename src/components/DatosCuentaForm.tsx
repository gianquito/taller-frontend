'use client'

import { useState } from 'react'
import BlackButton from './BlackButton'
import { updateUser } from '@/services/graphql'
import toast from 'react-hot-toast'

interface DatosCuentaFormProps {
    currentName: string
    currentApellido: string
    currentEmail: string
    idUsuario: string
}

export default function DatosCuentaForm({
    currentName,
    currentApellido,
    currentEmail,
    idUsuario,
}: DatosCuentaFormProps) {
    const [nombre, setNombre] = useState(currentName)
    const [apellido, setApellido] = useState(currentApellido)
    const [email, setEmail] = useState(currentEmail)
    function editUser() {
        updateUser(idUsuario, nombre, apellido, email)
            .then(() => toast.success('Actualizaste tus datos!'))
            .catch(() => toast.error('Hubo un error al actualizar tus datos'))
    }
    return (
        <>
            <div className="my-10 flex w-96 flex-col gap-4 md:w-[450px]">
                <input
                    className="border border-black px-5 py-3"
                    placeholder="Nombre"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                />
                <input
                    className="border border-black px-5 py-3"
                    placeholder="Apellido"
                    value={apellido}
                    onChange={e => setApellido(e.target.value)}
                />
                <input
                    className="border border-black px-5 py-3"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </div>
            <BlackButton text="Guardar cambios" onClick={editUser} />
        </>
    )
}
