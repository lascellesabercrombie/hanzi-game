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
    const { characterSet, updateCharacterSet } = useContext(CharacterContext) as CharacterContextType
    const [selectedCharacterSet, setSelectedCharacterSet] = useState(new Set<string>())

    const closeSearchModal = () => {
        setIsSearchModalOpen(false)
    }

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false)
        clearSelectedCharacterSet()
    }

    const selectCharacters = (character: string) => {
        const newSet = new Set(selectedCharacterSet);
        if (!newSet.has(character)) {
            newSet.add(character);
        } else {
            newSet.delete(character)
        }
        setSelectedCharacterSet(newSet);
    }

    const clearSelectedCharacterSet = () => {
        const newSet = new Set(selectedCharacterSet)
        newSet.clear()
        setSelectedCharacterSet(newSet)
    }

    const deleteSelectedCharacters = () => {
        const newSet = new Set(characterSet);
        newSet.forEach((element) => {
            if (selectedCharacterSet.has(element)) {
                newSet.delete(element)
            }
        })
        updateCharacterSet(newSet)
        setIsSelecting(false)
        //below should be possible when more generally implemented across browsers
        // onSetCharacterSet(characterSet.difference(selectedCharacterSet));
    }

    const updateIsResultsListVisible = (bool: boolean) => {
        setIsResultsListVisible(bool)
    }

    const openSearchModal = () => {
        setIsResultsListVisible(false)
        setIsSearchModalOpen(true)
    }

    const addToCharacterSet = (itemToAdd: string) => {
        const newSet = new Set(characterSet);
        newSet.add(itemToAdd);
        updateCharacterSet(newSet);
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
                    <div className="flex gap-3">
                        <button className="bg-cyan-800 flex rounded-lg px-4 py-2 w-fit drop-shadow-md hover:drop-shadow-xl active:drop-shadow-sm text-slate-200 font-medium justify-center items-center"
                            onClick={() => {
                                setIsSelecting(false)
                                clearSelectedCharacterSet()
                            }}
                        >
                            <span>Cancel</span>
                        </button>
                        <button
                            className="bg-cyan-800 disabled:bg-slate-600 flex rounded-lg pl-2 pr-4 py-2 w-fit drop-shadow-md hover:drop-shadow-xl active:drop-shadow-sm text-slate-200 font-medium justify-center items-center"
                            disabled={selectedCharacterSet.size <= 0}
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
                {isSelecting && selectedCharacterSet.size > 0 &&
                    <p>{`${selectedCharacterSet.size} characters selected`}</p>}
                <h2>Press a character to practise writing it</h2>
            </div>
            <CharacterGrid selectedCharacterSet={selectedCharacterSet} selectCharacters={selectCharacters} isSelecting={isSelecting} />
            <SearchModal isModalOpen={isSearchModalOpen} closeModal={closeSearchModal} isResultsListVisible={isResultsListVisible} updateIsResultsListVisible={updateIsResultsListVisible} addToCharacterSet={addToCharacterSet} />
            <DeleteModal characterSet={characterSet} isModalOpen={isDeleteModalOpen} selectedCharacterSet={selectedCharacterSet} closeModal={closeDeleteModal} onConfirmDelete={deleteSelectedCharacters} />
        </main>
    )
}