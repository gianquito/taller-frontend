import Image from 'next/image'
import ActionButton from './ActionButton'
import Kebab from './Kebab'
import { useState, useEffect } from 'react'
import { getPromociones } from '@/services/graphql'
import { useRouter } from 'next/navigation'

export default function PromocionGestion() {
    const [promociones, setPromociones] = useState<any[]>([])
    const router = useRouter()

    useEffect(() => {
        getPromociones().then(p => setPromociones(p))
    }, [])

    return (
        <div className="mx-auto my-10 max-w-[1200px]">
            <div className="flex justify-between">
                <h1 className="text-3xl font-semibold">Promociones</h1>
                <div className="flex items-center gap-4">
                    <ActionButton href="/nueva-promocion" text="Cargar Promoción" icon="/plus.png" />
                </div>
            </div>
            <div className="mt-6 overflow-auto">
                <div className="grid max-h-[500px] min-w-[980px] grid-cols-6 gap-4 text-center">
                    <div className="text-xl">Nombre</div>
                    <div className="text-xl">Libros</div>
                    <div className="text-xl">Descuento</div>
                    <div className="text-xl">Fecha inicio</div>
                    <div className="text-xl">Fecha fin</div>
                    <div className="text-xl">Acciones</div>

                    {promociones.map(promo => (
                        <>
                            <p className="text-sm">{promo.nombrePromocion}</p>
                            <p>{promo.libros.length}</p>
                            <p>{promo.porcentaje + '%'}</p>
                            <p>{new Date(promo.fechaInicio).toLocaleDateString('es-ar')}</p>
                            <p>{new Date(promo.fechaFin).toLocaleDateString('es-ar')}</p>
                            <div className="flex justify-center">
                                <Kebab
                                    actionList={[
                                        {
                                            name: 'Editar',
                                            function: () => {
                                                router.push(`/nueva-promocion/${promo.idPromocionDescuento}`)
                                            },
                                        },
                                    ]}
                                />
                            </div>
                        </>
                    ))}
                </div>
            </div>
        </div>
    )
}
