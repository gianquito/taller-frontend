'use client'

import Link from 'next/link'
import SearchBar from './SearchBar'
import UserNavbar from './UserNavbar'
import { useAuth } from '@/context/authContext'

export default function Navbar() {
    const { isAuthenticated } = useAuth()
    return (
        <nav className="mt-2 flex min-w-[400px] flex-shrink-0 flex-col items-center justify-evenly whitespace-nowrap px-12 text-center tracking-tight md:flex-row md:gap-4 xl:px-40 xl:text-lg">
            <Link href="/" className="text-xl font-bold">
                LibrosCdelU
            </Link>
            {isAuthenticated ? <UserNavbar /> : <Link href="#">Preguntas frecuentes</Link>}
            <div className="order-1 ml-4 flex items-center  gap-4 xl:ml-0 xl:gap-8">
                {isAuthenticated ? (
                    <>
                        <Link href="#">Lista de deseos</Link>
                        <Link href="#">Favoritos</Link>
                        <img alt="cart" src="/CartIcon.svg" />
                    </>
                ) : (
                    <>
                        <Link href="/ingresar">Registrate</Link>
                        <Link href="/ingresar">Ingresa</Link>
                        <img alt="cart" src="/CartIcon.svg" />
                    </>
                )}
            </div>
            <SearchBar />
        </nav>
    )
}
