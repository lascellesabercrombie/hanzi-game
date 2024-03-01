"use client"
import { createContext, useState } from "react";

export type CharacterContextType = {
    chosenCharacter: string,
    onSelectChosenCharacter: (character: string) => void,
}

export const CharacterContext = createContext<CharacterContextType | null>(null)

export default function ParentWrapper({
    children
}: {
    children: React.ReactNode
}) {
    const [chosenCharacter, setChosenCharacter] = useState('')
    const onSelectChosenCharacter = (character: string) => {
        setChosenCharacter(character)
    }
    return (
        <CharacterContext.Provider value={{ chosenCharacter, onSelectChosenCharacter }}>
            {children}
        </ CharacterContext.Provider>
    )
}