"use client"
import { createContext, useEffect, useState } from "react";

export interface CharacterContextType {
    characterSet: Set<string> | null,
    chosenCharacter: string,
    chooseCharacter: (character: string) => void,
    updateCharacterSet: (set: Set<string>) => void
}

export const CharacterContext = createContext<CharacterContextType | null>(null)

export default function ParentWrapper({
    children
}: {
    children: React.ReactNode
}) {
    const [characterSet, setCharacterSet] = useState<null | Set<string>>(null)
    const [chosenCharacter, setChosenCharacter] = useState('')
    const chooseCharacter = (character: string) => {
        setChosenCharacter(character)
    }
    const updateCharacterSet = (set: Set<string>) => {
        setCharacterSet(new Set(set))
    }
    useEffect(() => {
        const storedCharacters = JSON.parse(localStorage.getItem('characters') || '{}', (key, value) => {
            if (Array.isArray(value)) {
                return new Set(value)
            }
            return value
        });
        if (storedCharacters && storedCharacters.size > 0) {
            setCharacterSet(new Set(storedCharacters))
        } else {
            setCharacterSet(new Set(['的', '一', '是', '不', '	了']))
        }
    }, [])

    useEffect(() => {
        if (characterSet) {
            localStorage.setItem('characters', JSON.stringify(Array.from(characterSet)));
        }
        if (characterSet?.size === 0) {
            setChosenCharacter('')
        }
    }, [characterSet]);
    return (
        <CharacterContext.Provider value={{ characterSet, chosenCharacter, chooseCharacter, updateCharacterSet }}>
            {children}
        </ CharacterContext.Provider>
    )
}