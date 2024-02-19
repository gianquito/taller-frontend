import ActionButton from './ActionButton'
import Kebab from './Kebab'
import { useState, useEffect } from 'react'
import { getPromociones } from '@/services/graphql'
import { promocion } from '@/types/promocion'
import PromocionGestion from './PromocionGestion'

export default async function TablaPromocionesGestion() {
    const promociones: promocion[] = await getPromociones()

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
                        <PromocionGestion key={promo.idPromocionDescuento} promocion={promo} />
                    ))}
                </div>
            </div>
        </div>
    )
}
