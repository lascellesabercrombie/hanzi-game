'use client'
import { useState } from "react"
import { getInitialState } from "@/src/helpers/getInitialState"
import { onToggleSetting } from "@/src/helpers/onToggleSetting"
import { Title } from "@/src/components/Title"

export default function Settings() {
    const [isDefinitionVisible, setIsDefinitionVisible] = useState(getInitialState('isDefinitionVisible', true))
    const [isPronunciationVisible, setIsPronunciationVisible] = useState(getInitialState('isPronunciationVisible', true))
    const [isCharacterOutlineVisible, setIsCharacterOutlineVisible] = useState(getInitialState('isCharacterOutlineVisible', true))

    const options = [
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
    ]

    return (
        <main>
            <Title>Settings</Title>
            <ul className="toppings-list">
                {options.map(({ name, localStorageKey, state, setState }, index) => {
                    return (
                        <li key={index}>
                            <div className="left-section">
                                <input
                                    type="checkbox"
                                    id={`checkbox-${name}`}
                                    name={name}
                                    value={name}
                                    checked={state}
                                    onChange={() => onToggleSetting(localStorageKey, state, setState)}
                                />
                                <label htmlFor={`custom-checkbox-${name}`}>{name}</label>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </main>)
}