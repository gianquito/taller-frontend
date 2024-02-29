'use client'

import { useState } from 'react'
import BlackButton from './BlackButton'
import { AutocompleteBox } from './ui/AutocompleteBox'

export default function AdminFormGestion({ users }: { users: { id_usuario: string; email: string; rol: number }[] }) {
    const [formValues, setFormValues] = useState<string[]>([])

    function handleSubmit() {
        // get the difference between users and formValues
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
