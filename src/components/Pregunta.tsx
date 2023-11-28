interface PreguntaProps {
    pregunta: string
    respuesta: string
}
export default function Pregunta({ pregunta, respuesta }: PreguntaProps) {
    return (
        <details className="group border border-black px-8 py-5">
            <summary className="flex cursor-pointer select-none list-none justify-between font-semibold">
                {pregunta}
                <img className="-rotate-90 transition-all group-open:rotate-0" src="/ArrowDown.svg" />
            </summary>
            <p className="mt-0.5">{respuesta}</p>
        </details>
    )
}
