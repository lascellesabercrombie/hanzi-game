'use client'
import { useContext, useEffect, useState } from "react";
import { CharacterContext, CharacterContextType } from "../../components/ParentWrapper";
import { SearchModal } from "@/src/components/SearchModal";
import { useRouter } from 'next/navigation'
import { Title } from "@/src/components/Title";
import SvgAdd from "@/public/character/SvgAdd";

export default function Library() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isResultsListVisible, setIsResultsListVisible] = useState(false)
    const { characterSet, onSelectChosenCharacter, onSetCharacterSet } = useContext(CharacterContext) as CharacterContextType
    const router = useRouter()

    const closeModal = () => {
        setIsModalOpen(false)
    }

    const onSetIsResultsListVisible = (bool: boolean) => {
        setIsResultsListVisible(bool)
    }

    const openModal = () => {
        setIsResultsListVisible(false)
        setIsModalOpen(true)
    }

    const onAddToCharacterSet = (itemToAdd: string) => {
        const newSet = new Set(characterSet);
        newSet.add(itemToAdd);
        onSetCharacterSet(newSet);
    }

    return (
        <main className="flex flex-col">
            <Title>Library</Title>
            <div className="flex flex-col justify-center px-6 pb-2 pt-4 gap-3">
                <button className="bg-cyan-800 flex rounded-lg pl-2 pr-4 py-2 w-fit drop-shadow-md hover:drop-shadow-xl active:drop-shadow-sm text-slate-200 font-medium justify-center items-center" onClick={openModal}>
                    <SvgAdd className="w-8 h-8 *:stroke-slate-100" />
                    <span>Add character to library</span>
                </button>
                <h2>Press a character to practise writing it</h2>
            </div>
            <div className="p-6">
                <div className="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8 justify-items-center min-w-[80vw] px-6 py-4 border-2 border-slate-200 rounded-xl" data-testid="div-character-grid">
                    {Array.from(characterSet).map((character) =>
                        <button className="py-2 px-2 min-w-[min(20vw,10rem)] min-h-[min(20vw,10rem)] bg-blue-100 rounded-xl text-[min(5rem,10vw)] text-cyan-950 drop-shadow-md hover:drop-shadow-xl active:drop-shadow-sm" key={`button-${character}`}
                            onClick={() => {
                                onSelectChosenCharacter(character);
                                router.push('/practice')
                            }}
                        >
                            {character}
                        </button>
                    )}
                </div>
            </div>
            <SearchModal isModalOpen={isModalOpen} closeModal={closeModal} isResultsListVisible={isResultsListVisible} onSetIsResultsListVisible={onSetIsResultsListVisible} onAddToCharacterSet={onAddToCharacterSet} />
        </main>
    )
}