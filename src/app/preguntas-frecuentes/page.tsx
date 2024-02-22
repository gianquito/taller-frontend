import Pregunta from '@/components/Pregunta'

export default function PreguntasFrecuentes() {
    return (
        <div className="my-8 flex flex-col flex-wrap items-center px-12 md:my-16">
            <div className="flex w-full flex-col gap-10 md:w-3/4">
                <h1 className="self-start text-3xl font-semibold tracking-tighter md:text-4xl">Preguntas Frecuentes</h1>
                <section className="flex flex-col gap-6">
                    <Pregunta
                        pregunta="¿Cuál es el tiempo de entrega de los libros?"
                        respuesta="El tiempo de entrega de los libros físicos varía según la ubicación y el método de envío seleccionado. Por lo general, el tiempo estimado de entrega es de 3 a 7 días hábiles."
                    />
                    <Pregunta
                        pregunta="¿Puedo devolver un libro si no estoy satisfecho?"
                        respuesta="Sí, puedes devolver un libro si no estás satisfecho. Para ello, debes contactar con nuestro servicio de atención al cliente dentro de los 30 días posteriores a la recepción del libro y seguir las instrucciones para la devolución."
                    />
                    <Pregunta
                        pregunta="¿Cuál es el costo de envío?"
                        respuesta="El costo de envío depende del destino y del peso del libro. Durante el proceso de compra, se te mostrará el costo de envío correspondiente a tu dirección de entrega."
                    />
                    <Pregunta
                        pregunta="¿Qué métodos de pago aceptan?"
                        respuesta="Aceptamos como método de pago únicamente Mercado Pago."
                    />
                    <Pregunta
                        pregunta="¿Qué debo hacer si mi libro llega dañado?"
                        respuesta="Si tu libro llega dañado, por favor contáctanos de inmediato para que podamos resolver el problema. Podremos ofrecerte un reemplazo o un reembolso, dependiendo de tu preferencia."
                    />
                    <Pregunta
                        pregunta="¿Puedo cancelar mi pedido?"
                        respuesta="Sí, puedes cancelar tu pedido siempre y cuando no haya sido enviado. Por favor, contáctanos lo antes posible si deseas cancelar tu pedido."
                    />
                    <Pregunta
                        pregunta="¿Puedo realizar un cambio de dirección de entrega después de realizar el pedido?"
                        respuesta=" Si deseas realizar un cambio de dirección de entrega después de realizar el pedido, por favor contáctanos lo antes posible. Haremos nuestro mejor esfuerzo para actualizar la dirección de entrega, siempre y cuando el pedido no haya sido enviado."
                    />
                    <Pregunta
                        pregunta="¿Puedo comprar un producto sin crear una cuenta?"
                        respuesta="No, no puedes comprar un producto sin crear una cuenta. Además, crear una cuenta te permitirá acceder a tu lista de libros favoritos y administrar tu lista de deseos, entre otras cosas."
                    />
                    <Pregunta
                        pregunta="¿Qué debo hacer si no recibo mi pedido en el plazo de entrega estimado?"
                        respuesta="Si no recibes tu pedido en el plazo de entrega estimado, por favor contáctanos para que podamos investigar el problema."
                    />
                    <Pregunta
                        pregunta="¿Qué países tienen cobertura de envío?"
                        respuesta="En este momento, solo realizamos envíos a Argentina."
                    />
                    <Pregunta
                        pregunta="¿Qué debo hacer si tengo un problema con mi cuenta?"
                        respuesta="Si tienes un problema con tu cuenta, por favor contáctanos para que podamos ayudarte."
                    />
                    <Pregunta
                        pregunta="¿Cómo puedo agregar un producto a mi lista de deseos?"
                        respuesta="Puedes agregar un producto a tu lista de deseos haciendo clic en el icono de corazón que se encuentra junto al producto."
                    />
                </section>
            </div>
        </div>
    )
}
