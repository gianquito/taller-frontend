'use client'
import { useAuth } from '@/context/authContext'
import Link from 'next/link'
import { useState } from 'react'
import { useDetectClickOutside } from 'react-detect-click-outside'

export default function UserNavbar() {
    const [toggledMenu, setToggledMenu] = useState(false)
    const ref = useDetectClickOutside({ onTriggered: () => setToggledMenu(false) })
    const { logout, user } = useAuth()

    return (
        <div className="flex-shrink-0">
            <div
                className="flex cursor-pointer select-none items-center gap-2"
                onClick={() => setToggledMenu(prevToggled => !prevToggled)}
            >
                <img className="w-8 rounded-full" src={user.imagen} />
                <p>{user.nombre}</p>
                <img className={`w-4 transition-all ${toggledMenu && 'rotate-180'}`} src="/ArrowDown.svg" />
            </div>
            {toggledMenu && (
                <div className="absolute z-10 border border-black bg-white px-6 py-3" ref={ref}>
                    <div className="flex items-center gap-4">
                        <img className="w-10 rounded-full border" src={user.imagen} />
                        <p>{user.nombre + ' ' + user.apellido}</p>
                    </div>
                    <div className="mt-2 flex flex-col text-left text-sm">
                        <Link className="mt-1 hover:underline" href="/mi-cuenta" onClick={() => setToggledMenu(false)}>
                            Mi cuenta
                        </Link>
                        <Link
                            className="mt-1 hover:underline"
                            href="/preguntas-frecuentes"
                            onClick={() => setToggledMenu(false)}
                        >
                            Preguntas frecuentes
                        </Link>
                        {user.rol === 1 && (
                            <Link
                                className="mt-1 hover:underline"
                                href="/gestion"
                                onClick={() => setToggledMenu(false)}
                            >
                                Gestión
                            </Link>
                        )}
                        <p className="mt-1 cursor-pointer hover:underline" onClick={logout}>
                            Cerrar sesión
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
}
