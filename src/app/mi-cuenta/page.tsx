'use client'

import BlackButton from '@/components/BlackButton'
import ManagerAddress from '@/components/ManagerAddress'
import { useAuth } from '@/context/authContext'
import { getDirecciones, updateUser } from '@/services/graphql'
import { direccion } from '@/types/direccion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

export const dynamic = 'force-dynamic'

export default function MiCuenta() {
    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')
    const [email, setEmail] = useState('')
    const [direcciones, setDirecciones] = useState<direccion[]>([])
    const { user } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!user) return
        setNombre(user.nombre)
        setApellido(user.apellido)
        setEmail(user.email)

        getDirecciones(user.idUsuario)
            .then(dir => setDirecciones(dir))
            .catch(() => toast.error('Hubo un error al obtener tus direcciones'))
    }, [user])

    function editUser() {
        if (!user) {
            router.push('/ingresar')
            return
        }
        updateUser(user.idUsuario, nombre, apellido, email)
            .then(() => toast.success('Actualizaste tus datos!'))
            .catch(() => toast.error('Hubo un error al actualizar tus datos'))
    }

    return (
        <div className="flex h-screen items-center justify-center">
            <div>
                <h1 className="text-center text-2xl font-semibold">Mi cuenta</h1>
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
                <p className="mb-2 mt-4 font-bold">Direcciones</p>
                <div className="flex flex-col gap-4">
                    {direcciones.map(dir => (
                        <ManagerAddress
                            key={dir.idDireccion}
                            calle={dir.calle}
                            numero={dir.numero}
                            ciudad={dir.ciudad.nombreCiudad}
                            cp={dir.cpCiudad}
                            id={dir.idDireccion}
                        />
                    ))}
                </div>
                <Link href={'/direccion'}>
                    <p className="mt-2 cursor-pointer text-sm underline">Agregar dirección</p>
                </Link>
            </div>
        </div>
    )
}
