import { useEffect, useState } from 'react'

export default function useAutocompletado() {
    const [autocompletado, setAutocompletado] = useState<{ name: string }[]>([])
    const [showAutocompletado, setShowAutocompletado] = useState<string>('')

    function setOptions(options: { name: string }[]) {
        setAutocompletado(options)
    }

    function get() {
        return autocompletado
    }

    function setCategory(category: string) {
        setShowAutocompletado(category)
    }

    function getCategory() {
        return showAutocompletado
    }

    function hide() {
        setShowAutocompletado('')
    }

    useEffect(() => {
        setAutocompletado([])
    }, [showAutocompletado])

    return {
        setOptions,
        get,
        setCategory,
        getCategory,
        hide,
    }
}
