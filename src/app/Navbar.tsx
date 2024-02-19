import Link from 'next/link'
import SearchBar from '@/components/SearchBar'
import UserNavbar from '../components/UserNavbar'
import { getUserBySesion } from '@/services/graphql'
import { cookies } from 'next/headers'

export default async function Navbar() {
    const user = await getCurrentUser()
    async function getCurrentUser() {
        const cookie = cookies()
        const sessionId = cookie.get('sesionId')?.value
        if (!sessionId) return false
        const user = await getUserBySesion(sessionId)
        if (!user) return false
        return { ...user, sessionId }
    }

    return (
        <nav className="mt-2 flex flex-shrink-0 flex-col items-center justify-evenly whitespace-nowrap px-8 text-center tracking-tight md:flex-row md:gap-4 xl:px-40 xl:text-lg">
            <Link href="/" className="text-xl font-bold">
                LibrosCdelU
            </Link>
            {user ? <UserNavbar user={user} /> : <Link href="/preguntas-frecuentes">Preguntas frecuentes</Link>}
            <div className="order-1 flex flex-shrink-0 items-center gap-4 xl:gap-8">
                {user ? (
                    <>
                        <a href={`/lista-deseos/${user.idUsuario}`}>Lista de deseos</a>
                        <a href="/favoritos">Favoritos</a>
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
