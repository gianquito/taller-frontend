import Link from 'next/link'
import SearchBar from './SearchBar'

export default function Navbar() {
    return (
        <div className="mt-2 flex flex-col items-center justify-evenly text-lg tracking-tight md:flex-row lg:px-40">
            <p className="text-xl font-bold">LibrosCdelU</p>
            <Link href="#">Preguntas Frecuentes</Link>
            <SearchBar />
            <Link href="#">Lista de deseos</Link>
            <Link href="#">Favoritos</Link>
            <img alt="cart" src="CartIcon.svg" />
        </div>
    )
}
