import Link from 'next/link'
import SearchBar from './SearchBar'

export default function Navbar() {
    return (
        <div className="mt-2 flex flex-shrink-0 flex-col items-center justify-evenly px-12 text-center tracking-tight md:flex-row md:gap-4 lg:px-40 lg:text-lg">
            <Link href="/" className="text-xl font-bold">
                LibrosCdelU
            </Link>
            <Link href="#" className="hidden md:block">
                Preguntas Frecuentes
            </Link>
            <div className="order-1 flex items-center justify-around gap-8">
                <Link href="#">Lista de deseos</Link>
                <Link href="#">Favoritos</Link>
                <img alt="cart" src="CartIcon.svg" />
            </div>
            <SearchBar />
        </div>
    )
}
