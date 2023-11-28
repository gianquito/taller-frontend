import Pregunta from '@/components/Pregunta'

export default function PreguntasFrecuentes() {
    return (
        <div className="my-8 flex flex-col flex-wrap items-center px-12 md:my-16">
            <div className="flex w-full flex-col gap-10 md:w-3/4">
                <h1 className="self-start text-3xl font-semibold tracking-tighter md:text-4xl">Preguntas Frecuentes</h1>
                <section className="flex flex-col gap-6">
                    <Pregunta pregunta="¿Pregunta?" respuesta="Respuesta." />
                    <Pregunta pregunta="¿Pregunta?" respuesta="Respuesta." />
                    <Pregunta pregunta="¿Pregunta?" respuesta="Respuesta." />
                    <Pregunta pregunta="¿Pregunta?" respuesta="Respuesta." />
                    <Pregunta pregunta="¿Pregunta?" respuesta="Respuesta." />
                </section>
            </div>
        </div>
    )
}
