'use client'
import { promocion } from '@/types/promocion'
import Kebab from './Kebab'
import { useRouter } from 'next/navigation'

export default function PromocionGestion({ promocion }: { promocion: promocion }) {
    const router = useRouter()
    return (
        <>
            <p className="text-sm">{promocion.nombrePromocion}</p>
            <p>{promocion.libros.length}</p>
            <p>{promocion.porcentaje + '%'}</p>
            <p>{new Date(promocion.fechaInicio).toLocaleDateString('es-ar')}</p>
            <p>{new Date(promocion.fechaFin).toLocaleDateString('es-ar')}</p>
            <div className="flex justify-center">
                <Kebab
                    actionList={[
                        {
                            name: 'Editar',
                            function: () => {
                                router.push(`/nueva-promocion/${promocion.idPromocionDescuento}`)
                            },
                        },
                    ]}
                />
            </div>
        </>
    )
}
