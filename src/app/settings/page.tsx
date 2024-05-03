'use client'
import { useEffect, useState } from "react"
import { getInitialStateBool } from "@/src/helpers/getInitialStateBool"
import { getInitialStateNumber } from "@/src/helpers/getInitialStateNumber"
import { onToggleSetting } from "@/src/helpers/onToggleSetting"
import { Title } from "@/src/components/Title"
import { RadioGroup, Switch } from "@headlessui/react"

interface Option {
    name: string,
    localStorageKey: string,
    state: boolean,
    setState: (state: boolean) => void
}

interface SizeOption {
    id: number,
    name: string,
    value: number
}

export const availableSizes: ReadonlyArray<SizeOption> = [
    { id: 1, name: "Small", value: 100 },
    { id: 2, name: "Medium", value: 200 },
    { id: 3, name: "Large", value: 400 }
]

export default function Settings() {
    const [characterSize, setCharacterSize] = useState(getInitialStateNumber('characterSize', availableSizes[1]["id"]))
    const [isDefinitionVisible, setIsDefinitionVisible] = useState(getInitialStateBool('isDefinitionVisible', true))
    const [isPronunciationVisible, setIsPronunciationVisible] = useState(getInitialStateBool('isPronunciationVisible', true))
    const [isCharacterOutlineVisible, setIsCharacterOutlineVisible] = useState(getInitialStateBool('isCharacterOutlineVisible', true))
    const [options, setOptions] = useState<Array<Option>>([])

    function onChooseSize(size: number) {
        setCharacterSize(size)
        localStorage.setItem('characterSize', size.toString())
    }

    useEffect(() => {

        setOptions([
            {
                name: 'Show definition',
                localStorageKey: 'isDefinitionVisible',
                state: isDefinitionVisible,
                setState: setIsDefinitionVisible
            },
            {
                name: 'Show pronunciation (Mandarin)',
                localStorageKey: 'isPronunciationVisible',
                state: isPronunciationVisible,
                setState: setIsPronunciationVisible
            },
            {
                name: 'Show character outline',
                localStorageKey: 'isCharacterOutlineVisible',
                state: isCharacterOutlineVisible,
                setState: setIsCharacterOutlineVisible
            },
        ])
    }, [isDefinitionVisible, isPronunciationVisible, isCharacterOutlineVisible])

    return (
        <main>
            <Title>Settings</Title>
            <div className="flex flex-col p-4 gap-4">
                <ul className="py-4 px-6 border-2 border-slate-200 rounded-md">
                    {options.map(({ name, localStorageKey, state, setState }, index) => {
                        return (
                            <li key={index}>
                                <div>
                                    <Switch.Group>
                                        <div className="flex items-center py-2">
                                            <Switch
                                                name={name}
                                                value={name}
                                                checked={state}
                                                className={`${state ? 'bg-cyan-700' : 'bg-slate-500'}
                                            relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-neutral-100/75`}
                                                id={`checkbox-${name}`}
                                                onChange={() => onToggleSetting(localStorageKey, state, setState)}
                                            >
                                                <span
                                                    aria-hidden="true"
                                                    className={`${state ? 'translate-x-5' : 'translate-x-0'}
                                                 pointer-events-none inline-block h-4 w-4 transform rounded-full bg-slate-100 shadow-lg ring-0 transition duration-200 ease-in-out`}
                                                />
                                            </Switch>
                                            <Switch.Label className="pl-2">{name}</Switch.Label>
                                        </div>
                                    </Switch.Group>
                                </div>
                            </li>
                        );
                    })}

                </ul>
                <RadioGroup className="flex flex-col gap-4 py-4 px-6 border-2 border-slate-200 rounded-md text-center" value={characterSize} onChange={(e: number) => onChooseSize(e)}>
                    <RadioGroup.Label className="text-md">Size of practice character</RadioGroup.Label>
                    <div className="flex gap-4 justify-center">
                        <RadioGroup.Option
                            key={availableSizes[0]["id"]}
                            value={availableSizes[0]["id"]}
                            className={({ active, checked }) =>
                                `${active
                                    ? 'ring-2 ring-neutral-100/60 ring-offset-2 ring-offset-sky-300'
                                    : ''
                                }
                                ${checked ? 'bg-cyan-700 text-neutral-100' : 'bg-neutral-100'}
                                  relative flex flex-col w-24 justify-between cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                            }
                        >
                            <div><span aria-hidden className="text-sm">田</span></div>
                            <span className="text-md">{availableSizes[0]["name"]}</span>
                        </RadioGroup.Option>
                        <RadioGroup.Option
                            key={availableSizes[1]["id"]}
                            value={availableSizes[1]["id"]}
                            className={({ active, checked }) =>
                                `${active
                                    ? 'ring-2 ring-neutral-100 ring-offset-2 ring-offset-cyan-200'
                                    : ''
                                }
                                ${checked ? 'bg-cyan-700 text-neutral-100' : 'bg-neutral-100'}
                                  relative flex flex-col w-24 justify-between cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                            }
                        >
                            <div><span aria-hidden className="text-lg">田</span></div>
                            <span className="text-md">{availableSizes[1]["name"]}</span>
                        </RadioGroup.Option>
                        <RadioGroup.Option
                            key={availableSizes[2]["id"]}
                            value={availableSizes[2]["id"]}
                            className={({ active, checked }) =>
                                `${active
                                    ? 'ring-2 ring-neutral-100/60 ring-offset-2 ring-offset-sky-300'
                                    : ''
                                }
                                ${checked ? 'bg-cyan-700 text-neutral-100' : 'bg-neutral-100'}
                                  relative flex flex-col w-24 justify-between cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                            }
                        >
                            <div><span aria-hidden className="text-2xl">田</span></div>
                            <span className="text-md">{availableSizes[2]["name"]}</span>
                        </RadioGroup.Option>
                    </div>
                </RadioGroup>
            </div>
        </main>)
}