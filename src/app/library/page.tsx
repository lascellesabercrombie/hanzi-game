'use client'
import { useContext, useState } from "react";
import { CharacterContext, CharacterContextType } from "../../components/ParentWrapper";
import { SearchModal } from "@/src/components/SearchModal";
import { Title } from "@/src/components/Title";
import SvgAdd from "@/public/character/SvgAdd";
import { CharacterGrid } from "@/src/components/CharacterGrid";

export default function Library() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isResultsListVisible, setIsResultsListVisible] = useState(false)
    const { characterSet, onSetCharacterSet } = useContext(CharacterContext) as CharacterContextType

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
            <CharacterGrid />
            <SearchModal isModalOpen={isModalOpen} closeModal={closeModal} isResultsListVisible={isResultsListVisible} onSetIsResultsListVisible={onSetIsResultsListVisible} onAddToCharacterSet={onAddToCharacterSet} />
        </main>
    )
}