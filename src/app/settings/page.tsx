'use client'
import { useEffect, useState } from "react"
import { getInitialStateBool } from "@/src/helpers/getInitialStateBool"
import { getInitialStateNumber } from "@/src/helpers/getInitialStateNumber"
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
    const [characterSize, setCharacterSize] = useState(getInitialStateNumber('characterSize', 200))
    const [isDefinitionVisible, setIsDefinitionVisible] = useState(getInitialStateBool('isDefinitionVisible', true))
    const [isPronunciationVisible, setIsPronunciationVisible] = useState(getInitialStateBool('isPronunciationVisible', true))
    const [isCharacterOutlineVisible, setIsCharacterOutlineVisible] = useState(getInitialStateBool('isCharacterOutlineVisible', true))
    const [options, setOptions] = useState<Array<Option>>([])

    function onChooseSize(size: "small" | "medium" | "large") {
        switch (size) {
            case "small":
                setCharacterSize(100)
                localStorage.setItem('characterSize', (100).toString())
                break;
            case "medium":
                setCharacterSize(200)
                localStorage.setItem('characterSize', (200).toString())
                break;
            case "large":
                const large = Math.min(window.innerWidth - 100, 400)
                setCharacterSize(large)
                localStorage.setItem('characterSize', (large).toString())
                break;
        }

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
                                                className={`${state ? 'bg-cyan-700' : 'bg-slate-500'}
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
                                    <div>
                                        <button onClick={() => onChooseSize("small")}>small</button><br></br>
                                        <button onClick={() => onChooseSize("medium")}>medium</button><br></br>
                                        <button onClick={() => onChooseSize("large")}>big</button><br></br>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </main>)
}