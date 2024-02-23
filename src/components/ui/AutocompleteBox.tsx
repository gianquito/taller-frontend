'use client'

import * as React from 'react'
import { Check } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

interface AutocompleteBoxProps {
    availableOptions: Promise<string[]>
    category: string
    onValuesChange: (values: string[]) => void
    initialValues?: string[]
    preventAdd?: boolean
    className?: string
}

export function AutocompleteBox({
    availableOptions,
    category,
    onValuesChange,
    initialValues,
    preventAdd,
    className,
}: AutocompleteBoxProps) {
    const [options, setOptions] = React.useState<string[]>([])
    const [open, setOpen] = React.useState(false)
    const [values, setValues] = React.useState<string[]>(initialValues ?? [])
    const [searchValue, setSearchValue] = React.useState('')

    React.useEffect(() => {
        availableOptions.then(data => setOptions(data))
    }, [])

    React.useEffect(() => {
        onValuesChange(values)
    }, [values, onValuesChange])

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={`mb-3 h-max min-h-[50px] w-full flex-wrap gap-2 rounded-none border border-black outline-none ${className}`}
                >
                    {!values.length ? (
                        <span className="text-gray-400">Seleccionar</span>
                    ) : (
                        values.map(value => (
                            <div key={value} className="rounded-full border border-black px-4 font-normal">
                                {value}
                            </div>
                        ))
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[220px] p-0 ">
                <Command>
                    <CommandInput
                        placeholder={`Buscar ${category}...`}
                        onValueChange={search => setSearchValue(search)}
                    />
                    <CommandEmpty>No hay resultados.</CommandEmpty>
                    <CommandGroup className="max-h-[300px] overflow-y-auto">
                        {options.map(option => (
                            <CommandItem
                                key={option}
                                value={option}
                                onSelect={currentValue => {
                                    setValues(prevValues =>
                                        !prevValues.includes(option)
                                            ? [...prevValues, option]
                                            : prevValues.filter(value => value !== option)
                                    )
                                    setOpen(false)
                                }}
                            >
                                <Check
                                    className={cn(
                                        'mr-2 h-4 w-4 flex-shrink-0',
                                        values.includes(option) ? 'opacity-100' : 'opacity-0'
                                    )}
                                />
                                {option}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
                {searchValue && !preventAdd && (
                    <div>
                        <p className="text-center text-sm font-semibold">Agregar nuevo {category}</p>
                        <Button
                            variant="outline"
                            className="w-full justify-between font-normal"
                            onClick={() => {
                                if (values.includes(searchValue)) return
                                setOptions(prevOptions => [...prevOptions, searchValue])
                                setValues(prevValues => [...prevValues, searchValue])
                            }}
                        >
                            <span>{searchValue}</span>
                            <img className="w-[10px]" src="/plus.png" />
                        </Button>
                    </div>
                )}
            </PopoverContent>
        </Popover>
    )
}
