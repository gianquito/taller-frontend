'use client'

import { useRouter } from 'next/navigation'
import Kebab from './Kebab'
import { deleteDireccion } from '@/services/graphql'
import { toast } from 'react-hot-toast'

interface ManagerAddressProps {
    calle: string
    numero: number
    cp: number
    ciudad: string
    id: string
}

export default function ManagerAddress({ calle, numero, cp, ciudad, id }: ManagerAddressProps) {
    const router = useRouter()

    function deleteDirecc() {
        deleteDireccion(id)
            .then(() => {
                toast.success('Se eliminó la dirección')
                router.refresh()
            })
            .catch(() => toast.error('No se pudo eliminar la dirección'))
    }

    return (
        <div className="flex w-full justify-between leading-tight tracking-tight">
            <div>
                <p>{`${calle} ${numero}, CP ${cp}`}</p>
                <p>{ciudad}</p>
            </div>
            <Kebab
                actionList={[
                    {
                        name: 'Editar',
                        function: () => router.push(`/direccion/${id}`),
                    },
                    {
                        name: 'Eliminar',
                        function: deleteDirecc,
                    },
                ]}
            />
        </div>
    )
}
