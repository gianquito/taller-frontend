import CargarPreguntaFrecuente from '@/components/CargarPreguntaFrecuente'
import Pregunta from '@/components/Pregunta'
import { getPreguntasFrecuentes } from '@/services/graphql'
import { getSsrUser } from '@/ssrUtils'

export const dynamic = 'force-dynamic'

export default async function PreguntasFrecuentes() {
    const preguntasFrecuentes = await getPreguntasFrecuentes()
    const user = await getSsrUser()
    return (
        <div className="my-8 flex flex-col flex-wrap items-center px-12 md:my-16">
            <div className="flex w-full flex-col gap-10 md:w-3/4">
                <h1 className="self-start text-3xl font-semibold tracking-tighter md:text-4xl">Preguntas Frecuentes</h1>
                <section className="flex flex-col gap-6">
                    {preguntasFrecuentes.map(preguntaFrecuente => (
                        <Pregunta
                            key={preguntaFrecuente.id}
                            {...preguntaFrecuente}
                            id={preguntaFrecuente.id}
                            user={user}
                        />
                    ))}
                </section>
                <CargarPreguntaFrecuente user={user} />
            </div>
        </div>
    )
}
