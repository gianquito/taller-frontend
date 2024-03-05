import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion'

interface PreguntaProps {
    pregunta: string
    respuesta: string
    onEliminar: () => void;
}
export default function Pregunta({ pregunta, respuesta, onEliminar }: PreguntaProps) {
    return (
        <Accordion type="single" collapsible>
            <AccordionItem value="item-1" className="border border-black px-8">
                <AccordionTrigger className="font-semibold">{pregunta}</AccordionTrigger>
                <AccordionContent>
                    {respuesta}
                    <button onClick={onEliminar}  className="text-red-500 hover:text-red-600 font-bold px-4 py-2 rounded-md transition-all duration-300 ml-auto border-none bg-none ml-auto">Eliminar</button>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}
