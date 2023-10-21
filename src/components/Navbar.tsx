import Link from 'next/link'
import SearchBar from './SearchBar'
import UserNavbar from './UserNavbar'

export default function Navbar() {
    return (
        <div className="mt-2 flex min-w-[400px] flex-shrink-0 flex-col items-center justify-evenly whitespace-nowrap px-12 text-center tracking-tight md:flex-row md:gap-4 xl:px-40 xl:text-lg">
            <Link href="/" className="text-xl font-bold">
                LibrosCdelU
            </Link>
            <UserNavbar />
            <div className="order-1 ml-4 flex items-center justify-around gap-8">
                <Link href="#">Lista de deseos</Link>
                <Link href="#">Favoritos</Link>
                <img alt="cart" src="/CartIcon.svg" />
            </div>
            <SearchBar />
        </div>
    )
}
