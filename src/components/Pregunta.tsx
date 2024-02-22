import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion'

interface PreguntaProps {
    pregunta: string
    respuesta: string
}
export default function Pregunta({ pregunta, respuesta }: PreguntaProps) {
    return (
        <Accordion type="single" collapsible>
            <AccordionItem value="item-1" className="border border-black px-8">
                <AccordionTrigger className="font-semibold">{pregunta}</AccordionTrigger>
                <AccordionContent>{respuesta}</AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}
