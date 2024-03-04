'use client'

import { useState } from 'react'
import BlackButton from './BlackButton'
import { AutocompleteBox } from './ui/AutocompleteBox'
import { updateUserRol } from '@/services/graphql'

export default function AdminFormGestion({ users }: { users: { idUsuario: string; email: string; rol: number }[] }) {
    const [formValues, setFormValues] = useState<string[]>([])

    function findDifferences(array1: string[], array2: string[]) {
        const removed = array1.filter(item => !array2.includes(item))
        const added = array2.filter(item => !array1.includes(item))
        return { removed, added }
    }

    function handleSubmit() {
        const currentAdminList = users.filter(user => user.rol == 1).map(user => user.email)
        const { removed, added } = findDifferences(currentAdminList, formValues)
        removed.forEach(removedUser => updateUserRol(users.find(user => user.email === removedUser)!.idUsuario, 2))
        added.forEach(addedUser => updateUserRol(users.find(user => user.email === addedUser)!.idUsuario, 1))
    }

    return (
        <div className="mx-auto mb-12 flex max-w-[1200px] flex-col items-center">
            <p className="self-start text-3xl font-semibold">Editar administradores</p>
            <div className="mt-4 flex w-1/2 items-center gap-2">
                <AutocompleteBox
                    availableOptions={() =>
                        new Promise(resolve => {
                            resolve(users.map(user => user.email))
                        })
                    }
                    category="usuario"
                    initialValues={users.filter(user => user.rol == 1).map(user => user.email)}
                    preventAdd
                    onValuesChange={values => setFormValues(values)}
                    className="!mb-0"
                />
                <BlackButton text="Guardar" className="w-max px-8 text-sm" onClick={handleSubmit} />
            </div>
        </div>
    )
}
