'use client'
import { useContext, useEffect, useState } from "react";
import { CharacterContext, CharacterContextType } from "../../components/ParentWrapper";
import { SearchModal } from "@/src/components/SearchModal";
import { Title } from "@/src/components/Title";
import SvgAdd from "@/public/character/SvgAdd";
import SvgDelete from "@/public/character/SvgDelete";
import { CharacterGrid } from "@/src/components/CharacterGrid";
import { DeleteModal } from "@/src/components/DeleteModal";

export default function Library() {
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [isResultsListVisible, setIsResultsListVisible] = useState(false)
    const [isSelecting, setIsSelecting] = useState(false)
    const { characterSet, onSetCharacterSet } = useContext(CharacterContext) as CharacterContextType
    const [selectCharacterSet, setSelectCharacterSet] = useState(new Set<string>())

    const closeSearchModal = () => {
        setIsSearchModalOpen(false)
    }

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false)
        onClearSelectCharacterSet()
    }

    const onSelectMultipleCharacters = (character: string) => {
        const newSet = new Set(selectCharacterSet);
        if (!newSet.has(character)) {
            newSet.add(character);
        } else {
            newSet.delete(character)
        }
        setSelectCharacterSet(newSet);
    }

    const onClearSelectCharacterSet = () => {
        const newSet = new Set(selectCharacterSet)
        newSet.clear()
        setSelectCharacterSet(newSet)
    }

    const onDeleteSelectedCharacters = () => {
        const newSet = new Set(characterSet);
        newSet.forEach((element) => {
            if (selectCharacterSet.has(element)) {
                newSet.delete(element)
            }
        })
        onSetCharacterSet(newSet)
        setIsSelecting(false)
        //below should be possible when more generally implemented across browsers
        // onSetCharacterSet(characterSet.difference(selectCharacterSet));
    }

    const onSetIsResultsListVisible = (bool: boolean) => {
        setIsResultsListVisible(bool)
    }

    const openSearchModal = () => {
        setIsResultsListVisible(false)
        setIsSearchModalOpen(true)
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
                <button className="bg-cyan-800 flex rounded-lg pl-2 pr-4 py-2 w-fit drop-shadow-md hover:drop-shadow-xl active:drop-shadow-sm text-slate-200 font-medium justify-center items-center" onClick={openSearchModal}>
                    <SvgAdd className="w-8 h-8 *:stroke-slate-100" />
                    <span>Add character to library</span>
                </button>
                {isSelecting ?
                    <div><button className="bg-cyan-800 flex rounded-lg px-4 py-2 w-fit drop-shadow-md hover:drop-shadow-xl active:drop-shadow-sm text-slate-200 font-medium justify-center items-center"
                        onClick={() => {
                            setIsSelecting(false)
                            onClearSelectCharacterSet()
                        }}
                    >
                        <span>Cancel</span>
                    </button>
                        <button
                            className="bg-cyan-800 disabled:bg-slate-600 flex rounded-lg pl-2 pr-4 py-2 w-fit drop-shadow-md hover:drop-shadow-xl active:drop-shadow-sm text-slate-200 font-medium justify-center items-center"
                            disabled={selectCharacterSet.size <= 0}
                            onClick={() => { setIsDeleteModalOpen(true) }}>
                            <SvgDelete className="w-8 h-8 *:fill-slate-100" />
                            <span>Delete</span>
                        </button>
                    </div>
                    :
                    <button className="bg-cyan-800 flex rounded-lg px-4 py-2 w-fit drop-shadow-md hover:drop-shadow-xl active:drop-shadow-sm text-slate-200 font-medium justify-center items-center"
                        onClick={() => {
                            setIsSelecting(true)
                        }}
                    >
                        <span>Select</span>
                    </button>}
                {isSelecting && selectCharacterSet.size > 0 &&
                    <p>{`${selectCharacterSet.size} characters selected`}</p>}
                <h2>Press a character to practise writing it</h2>
            </div>
            <CharacterGrid selectCharacterSet={selectCharacterSet} onSelectMultipleCharacters={onSelectMultipleCharacters} isSelecting={isSelecting} />
            <SearchModal isModalOpen={isSearchModalOpen} closeModal={closeSearchModal} isResultsListVisible={isResultsListVisible} onSetIsResultsListVisible={onSetIsResultsListVisible} onAddToCharacterSet={onAddToCharacterSet} />
            <DeleteModal characterSet={characterSet} isModalOpen={isDeleteModalOpen} selectCharacterSet={selectCharacterSet} closeModal={closeDeleteModal} onDeleteCharacter={onDeleteSelectedCharacters} />
        </main>
    )
}