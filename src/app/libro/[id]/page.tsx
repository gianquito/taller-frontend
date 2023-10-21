import ActionButton from '@/components/ActionButton'
import BlackButton from '@/components/BlackButton'

export default function Libro({ params }: { params: { id: number } }) {
    return (
        <div className="mt-6 flex flex-1 flex-col items-center justify-around lg:mt-20 lg:flex-row">
            <div>
                <img
                    className="w-[240px] lg:w-96"
                    src="https://images.bajalibros.com/etIywzV904aWEB6I5u6w8xZgQXs=/fit-in/292x446/filters:fill(f8f8f8):quality(90):format(webp)/d2d6tho5fth6q4.cloudfront.net/extast2138527_a43e5f7300a463171d4b54946a622b26d3b49359.jpg"
                />
                <div className="mt-0.5 flex items-center gap-2">
                    <img src="/Star.svg" />
                    <p className="text-sm font-semibold">4,5</p>
                    <ActionButton href="/" icon="/Reseña.png" text="Reseñas" />
                </div>
            </div>
            <div className="mt-6 flex max-w-xl flex-col items-center lg:mt-0 lg:items-baseline">
                <h1 className="text-center text-4xl font-semibold lg:text-left">Harry Potter y la piedra filosofal</h1>
                <div className="mt-2 flex w-full items-center justify-evenly lg:mt-0 lg:flex-col lg:items-baseline">
                    <p className="mt-1 text-2xl">$99</p>
                    <div className="mt-1 flex flex-col gap-0.5 text-sm text-neutral-500">
                        <p>Autor: J. K. Rowling</p>
                        <p>Dimensiones: 15 × 23 cm</p>
                        <p>Editorial: SALAMANDRA</p>
                        <p>Páginas: 288</p>
                        <p>Género: Novela</p>
                        <p>Encuadernado: Tapa blanda</p>
                    </div>
                </div>
                <BlackButton className="mt-6" text="Agregar al Carrito" />
                <div className="my-1 mt-2 flex gap-2 self-start">
                    <img className="h-8" src="/Wishlist.png" />
                    <img className="h-8" src="/Favorito.png" />
                </div>
                <p className="text-2xl font-medium">Sinopsis</p>
                <p>
                    Harry Potter y la piedra filosofal es una novela de fantasía escrita por J. K. Rowling. Narra la
                    historia de Harry Potter, un niño huérfano que descubre que es un mago y que debe asistir a la
                    escuela Hogwarts de Magia y Hechicería. Allí, Harry se hace amigos de Ron Weasley y Hermione
                    Granger, y se enfrenta al malvado Lord Voldemort, que busca la piedra filosofal para recuperar su
                    poder y su inmortalidad.
                </p>
            </div>
        </div>
    )
}
