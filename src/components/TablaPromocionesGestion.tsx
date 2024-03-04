import ActionButton from './ActionButton'
import Kebab from './Kebab'
import { getPromociones } from '@/services/graphql'
import { promocion } from '@/types/promocion'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'

export default async function TablaPromocionesGestion() {
    const promociones: promocion[] = await getPromociones()

    return (
        <div className="mx-auto mb-16 max-w-[1200px]">
            <div className="flex justify-between">
                <h1 className="text-3xl font-semibold">Promociones</h1>
                <div className="flex items-center gap-4">
                    <ActionButton href="/gestion/nueva-promocion" text="Cargar Promoción" icon="/plus.png" />
                </div>
            </div>
            <div className="mt-4 max-h-[800px] overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nombre</TableHead>
                            <TableHead className="text-center">Ejemplares</TableHead>
                            <TableHead className="text-center">Descuento</TableHead>
                            <TableHead className="text-center">Fecha de inicio</TableHead>
                            <TableHead className="text-center">Fecha de fin</TableHead>
                            <TableHead className="text-center">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {promociones.map(promocion => (
                            <TableRow key={promocion.idPromocionDescuento}>
                                <TableCell>{promocion.nombrePromocion}</TableCell>
                                <TableCell className="text-center">{promocion.ejemplares.length}</TableCell>
                                <TableCell className="text-center">{promocion.porcentaje + '%'}</TableCell>
                                <TableCell className="text-center">
                                    {new Date(promocion.fechaInicio).toLocaleDateString('es-ar')}
                                </TableCell>
                                <TableCell className="text-center">
                                    {new Date(promocion.fechaFin).toLocaleDateString('es-ar')}
                                </TableCell>
                                <TableCell>
                                    <div className="flex justify-center">
                                        <Kebab
                                            actionList={[
                                                {
                                                    name: 'Editar',
                                                    routeTo: `/gestion/nueva-promocion/${promocion.idPromocionDescuento}`,
                                                },
                                            ]}
                                        />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
