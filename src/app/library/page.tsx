'use client'
import { useContext, useEffect, useState } from "react";
import { CharacterContext, CharacterContextType } from "../../components/ParentWrapper";
import { SearchModal } from "@/src/components/SearchModal";
import { useRouter } from 'next/navigation'
import { Title } from "@/src/components/Title";
import SvgAdd from "@/public/character/SvgAdd";

export default function Library() {
    const [characterSet, setCharacterSet] = useState(new Set<string>())
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isResultsListVisible, setIsResultsListVisible] = useState(false)
    const { onSelectChosenCharacter } = useContext(CharacterContext) as CharacterContextType
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
        setCharacterSet((characterSet) => {
            const newSet = new Set(characterSet);
            newSet.add(itemToAdd);
            return newSet;
        });
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
        if (characterSet.size > 0) {
            localStorage.setItem('characters', JSON.stringify(Array.from(characterSet)));
        }
    }, [characterSet]);

    return (
        <main className="flex flex-col">
            <Title>Library</Title>
            <div className="flex flex-col justify-center px-6 pb-2 pt-4 gap-3">
                <button className="bg-cyan-700 flex rounded-lg pl-2 pr-4 py-2 w-fit shadow-lg text-slate-200 font-medium justify-center items-center" onClick={openModal}>
                    <SvgAdd className="w-8 h-8 *:stroke-slate-200" />
                    <span>Add character to library</span>
                </button>
                <h3>Press a character to practise writing it</h3>
            </div>

            <div className="grid grid-cols-3 gap-6 px-6 py-2">
                {Array.from(characterSet).map((character) =>
                    <button className="py-6 px-2 max-w-28 bg-blue-100 rounded-xl text-3xl text-cyan-950 shadow-lg" key={`button-${character}`}
                        onClick={() => {
                            onSelectChosenCharacter(character);
                            router.push('/practice')
                        }}
                    >{character}</button>
                )}
            </div>
            <SearchModal isModalOpen={isModalOpen} closeModal={closeModal} isResultsListVisible={isResultsListVisible} onSetIsResultsListVisible={onSetIsResultsListVisible} onAddToCharacterSet={onAddToCharacterSet} />
        </main>
    )
}