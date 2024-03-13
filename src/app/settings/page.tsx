'use client'
import { useEffect, useState } from "react"
import { getInitialState } from "@/src/helpers/getInitialState"
import { onToggleSetting } from "@/src/helpers/onToggleSetting"
import { Title } from "@/src/components/Title"
import { Switch } from "@headlessui/react"

interface Option {
    name: string,
    localStorageKey: string,
    state: boolean,
    setState: (state: boolean) => void
}

export default function Settings() {
    const [isDefinitionVisible, setIsDefinitionVisible] = useState(getInitialState('isDefinitionVisible', true))
    const [isPronunciationVisible, setIsPronunciationVisible] = useState(getInitialState('isPronunciationVisible', true))
    const [isCharacterOutlineVisible, setIsCharacterOutlineVisible] = useState(getInitialState('isCharacterOutlineVisible', true))
    const [options, setOptions] = useState<Array<Option>>([])
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
            <div className="p-4">
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
                                                className={`${state ? 'bg-cyan-800' : 'bg-cyan-600'}
                                            relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
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
            </div>
        </main>)
}