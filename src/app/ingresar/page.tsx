export default function Ingresar() {
    return (
        <div className="flex h-screen items-center justify-center">
            <div className="flex flex-col gap-4 rounded-lg border bg-[url('../../public/LoginBg.png')] bg-center px-8 py-4">
                <p className="text-center text-xl text-white">Ingresar</p>
                <div className="flex justify-center gap-2 rounded-md bg-white px-12 py-2">
                    <img src="Facebook.svg" />
                    <p>Continuar con Facebook</p>
                </div>
                <div className="flex justify-center gap-2 rounded-md bg-white px-12 py-2">
                    <img src="Google.svg" />
                    <p>Continuar con Google</p>
                </div>
            </div>
        </div>
    )
}
