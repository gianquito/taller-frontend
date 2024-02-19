import ClientNavigator from '@/components/ClientNavigator'
import DatosCuentaForm from '@/components/DatosCuentaForm'
import ManagerAddress from '@/components/ManagerAddress'
import { getDirecciones } from '@/services/graphql'
import { getSsrUser } from '@/ssrUtils'
import { direccion } from '@/types/direccion'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function MiCuenta() {
    const user = await getSsrUser()

    if (!user) return <ClientNavigator route="/ingresar" />

    const direcciones: direccion[] = await getDirecciones(user.idUsuario, user.sessionId)

    return (
        <div className="flex h-screen items-center justify-center">
            <div>
                <h1 className="text-center text-2xl font-semibold">Mi cuenta</h1>
                <DatosCuentaForm
                    currentName={user.nombre}
                    currentApellido={user.apellido}
                    currentEmail={user.email}
                    idUsuario={user.idUsuario}
                />
                <p className="mb-2 mt-4 font-bold">Direcciones</p>
                <div className="flex flex-col gap-4">
                    {direcciones.map(dir => (
                        <ManagerAddress
                            key={dir.idDireccion}
                            calle={dir.calle}
                            numero={dir.numero}
                            ciudad={dir.ciudad.nombreCiudad}
                            cp={dir.cpCiudad}
                            id={dir.idDireccion}
                        />
                    ))}
                </div>
                <Link href={'/direccion'}>
                    <p className="mt-2 cursor-pointer text-sm underline">Agregar dirección</p>
                </Link>
            </div>
        </div>
    )
}
