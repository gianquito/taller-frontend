'use client'

import Link from 'next/link'
import SearchBar from './SearchBar'
import UserNavbar from './UserNavbar'
import { useAuth } from '@/context/authContext'

export default function Navbar() {
    const { isAuthenticated, user } = useAuth()
    return (
        <nav className="mt-2 flex flex-shrink-0 flex-col items-center justify-evenly whitespace-nowrap px-8 text-center tracking-tight md:flex-row md:gap-4 xl:px-40 xl:text-lg">
            <Link href="/" className="text-xl font-bold">
                LibrosCdelU
            </Link>
            {isAuthenticated ? <UserNavbar /> : <Link href="/preguntas-frecuentes">Preguntas frecuentes</Link>}
            <div className="order-1 flex flex-shrink-0 items-center gap-4 xl:gap-8">
                {isAuthenticated ? (
                    <>
                        <Link href={`/lista-deseos/${user.idUsuario}`}>Lista de deseos</Link>
                        <Link href="/favoritos">Favoritos</Link>
                        <Link href="/carrito">
                            <img alt="cart" src="/CartIcon.svg" className="min-w-[32px]" />
                        </Link>
                    </>
                ) : (
                    <>
                        <Link href="/ingresar">Registrate</Link>
                        <Link href="/ingresar">Ingresa</Link>
                    </>
                )}
            </div>
            <SearchBar />
        </nav>
    )
}
