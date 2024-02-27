import { ChangeEvent, useState } from 'react'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import BlackButton from './BlackButton'
import { ejemplarForm } from '@/types/ejemplarForm'
import { AutocompleteBox } from './ui/AutocompleteBox'
import { getEditoriales, getEncuadernados } from '@/services/graphql'

interface EditarEjemplarDialogProps {
    submitFn: (newEjemplar: ejemplarForm | undefined) => void
    currentEjemplar?: ejemplarForm
    triggerElement: React.ReactNode
}

export default function EditarEjemplarDialog({ submitFn, currentEjemplar, triggerElement }: EditarEjemplarDialogProps) {
    const [ejemplar, setEjemplar] = useState<ejemplarForm | undefined>(currentEjemplar)

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        //@ts-ignore
        setEjemplar(prevEjemplar => ({ ...prevEjemplar, [e.target.name]: e.target.value }))
    }

    async function fetchEditoriales() {
        const editoriales = await getEditoriales('')
        return editoriales.map((ed: any) => ed.nombreEditorial)
    }

    async function fetchEncuadernados() {
        const encuadernados = await getEncuadernados('')
        return encuadernados.map((en: any) => en.tipo)
    }

    return (
        <Dialog onOpenChange={() => setEjemplar(currentEjemplar)}>
            <DialogTrigger>{triggerElement}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Editar ejemplar</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col">
                    <label className="text-sm">ISBN</label>
                    <input
                        className="mb-3 border border-black px-5 py-3"
                        placeholder="ISBN"
                        value={ejemplar?.isbn}
                        type="number"
                        name="isbn"
                        min={0}
                        onChange={handleChange}
                    />
                    <label className="text-sm">Precio</label>
                    <input
                        className="mb-3 border border-black px-5 py-3"
                        placeholder="Precio"
                        value={ejemplar?.precio}
                        type="number"
                        name="precio"
                        min={0}
                        onChange={handleChange}
                    />
                    <label className="text-sm">Dimensiones</label>
                    <input
                        className="mb-3 border border-black px-5 py-3"
                        placeholder="Dimensiones"
                        value={ejemplar?.dimensiones}
                        name="dimensiones"
                        onChange={handleChange}
                    />
                    <label className="text-sm">Páginas</label>
                    <input
                        className="mb-3 border border-black px-5 py-3"
                        placeholder="Páginas"
                        value={ejemplar?.paginas}
                        type="number"
                        name="paginas"
                        min={0}
                        onChange={handleChange}
                    />
                    <label className="text-sm">Stock</label>
                    <input
                        className="mb-3 border border-black px-5 py-3"
                        placeholder="Stock"
                        value={ejemplar?.stock}
                        type="number"
                        name="stock"
                        min={0}
                        onChange={handleChange}
                    />
                    <label className="text-sm">Editorial</label>
                    <AutocompleteBox
                        availableOptions={fetchEditoriales}
                        category="editorial"
                        initialValues={ejemplar ? [ejemplar.editorial] : []}
                        onValuesChange={values =>
                            //@ts-ignore
                            setEjemplar(prevEjemplar => ({ ...prevEjemplar, editorial: values[0] }))
                        }
                        preventMultiple
                    />
                    <label className="text-sm">Encuadernado</label>
                    <AutocompleteBox
                        availableOptions={fetchEncuadernados}
                        category="encuadernado"
                        initialValues={ejemplar ? [ejemplar.encuadernado] : []}
                        onValuesChange={values =>
                            //@ts-ignore
                            setEjemplar(prevEjemplar => ({ ...prevEjemplar, encuadernado: values[0] }))
                        }
                        preventMultiple
                    />
                </div>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <div className="flex w-full gap-2">
                            <BlackButton text="Cancelar" className="bg-neutral-600 !py-3" />
                            <BlackButton text="Confirmar" className="!py-3" onClick={() => submitFn(ejemplar)} />
                        </div>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
