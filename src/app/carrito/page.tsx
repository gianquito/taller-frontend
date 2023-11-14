import BlackButton from '@/components/BlackButton'
import ProductCart from '@/components/ProductCart'

export default function Carrito() {
    return (
        <div>
            <div className="mt-8 flex flex-col items-center justify-evenly lg:flex-row">
                <div className="flex flex-col gap-4">
                    <h1 className="self-start text-4xl font-semibold tracking-tighter">Carrito</h1>
                    <ProductCart
                        title="Harry Potter y la piedra filosofal"
                        author="J. K. Rowling"
                        price={99}
                        image="https://images.bajalibros.com/MBod5kOZT6hAhICPJ13UP40PLug=/fit-in/140x216/filters:fill(f8f8f8):quality(90):format(webp)/d2d6tho5fth6q4.cloudfront.net/extast2145006_67697bbc4ce6c1a5bdd9b32492a918f4c76a6668.jpg"
                        id={1}
                        amount={1}
                    />
                    <ProductCart
                        title="Harry Potter y la piedra filosofal"
                        author="J. K. Rowling"
                        price={99}
                        image="https://images.bajalibros.com/MBod5kOZT6hAhICPJ13UP40PLug=/fit-in/140x216/filters:fill(f8f8f8):quality(90):format(webp)/d2d6tho5fth6q4.cloudfront.net/extast2145006_67697bbc4ce6c1a5bdd9b32492a918f4c76a6668.jpg"
                        id={1}
                        amount={1}
                    />
                </div>
                <div className="my-12 ml-4 flex w-max flex-col justify-center gap-12 lg:my-0">
                    <p className="text-2xl font-semibold">Resumen</p>
                    <div className="flex w-80 flex-col gap-2 sm:w-96">
                        <div className="flex justify-between">
                            <p>Subtotal</p>
                            <p>$198</p>
                        </div>
                        <div className="h-0.5 bg-black"></div>
                        <div className="flex  justify-between">
                            <p>Total</p>
                            <p>$198</p>
                        </div>
                    </div>
                    <BlackButton text="Continuar" />
                </div>
            </div>
        </div>
    )
}
