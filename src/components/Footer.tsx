export default function Footer() {
    return (
        <div className="mt-8 flex flex-col items-center justify-around gap-2 bg-[#C4C4C4] py-2 text-sm md:flex-row">
            <div className="text-center md:text-left">
                <p>9 de Julio 389, Piso 2, CP 3260</p>
                <p>Concepcion del Uruguay, Entre Ríos</p>
            </div>
            <div className="order-1 flex gap-1 md:order-none">
                <p>© 2023 | </p>
                <p className="font-bold">LibrosCdelU</p>
            </div>
            <div className="font-bold md:text-lg">
                <div className="flex gap-2">
                    <img className="w-4 md:w-6" alt="mail" src="MailIcon.svg" />
                    <p>libroscdelu@gmail.com</p>
                </div>
                <div className="flex gap-2">
                    <img className="w-3 md:w-5" alt="telefono" src="PhoneIcon.svg" />
                    <p>#########</p>
                </div>
            </div>
        </div>
    )
}
