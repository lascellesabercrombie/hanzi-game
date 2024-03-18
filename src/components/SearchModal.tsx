import { Fragment, Suspense, useContext, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react'
import { CharacterContext, CharacterContextType } from './ParentWrapper'
import { validateInput } from '../helpers/validateInput';
import { convertPinyin } from '../helpers/ccdbUtils';
import SvgSearch from '@/public/character/SvgSearch';

interface SearchModalProps {
    isModalOpen: boolean,
    closeModal: () => void,
    onAddToCharacterSet: (itemToAdd: string) => void
}

interface SearchResult {
    character: string,
    definition?: string,
    pronunciation?: string,
}

interface FetchDefinitionResultItem {
    character: string,
    kdefinition?: string,
    kmandarin?: string
}

export const SearchModal = ({ isModalOpen, closeModal, onAddToCharacterSet }: SearchModalProps) => {
    const { chosenCharacter } = useContext(CharacterContext) as CharacterContextType
    const [searchResults, setSearchResults] = useState<null | Array<SearchResult>>(null)

    return (<Transition appear show={isModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="fixed inset-0 bg-black/25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Dialog.Panel className="w-full max-w-sm transform overflow-hidden rounded-2xl bg-neutral-100 text-cyan-950 p-10 text-left align-middle shadow-xl transition-all">
                            <Dialog.Title
                                as="h3"
                                className="text-lg font-medium leading-6"
                            >
                                Add character to library
                            </Dialog.Title>
                            <div className="flex flex-col mt-6 justify-between">
                                <form action={(formData) => {
                                    const query = formData.get("newCharacter");
                                    if (typeof query === "string" && validateInput(query) === "chinese") {
                                        onAddToCharacterSet(query)
                                        closeModal()
                                    }
                                    if (typeof query === "string" && validateInput(query) === "english") {
                                        fetch(`api/search-by-definition/?query=${query}`)
                                            .then((response) => {
                                                setSearchResults([]);
                                                return response.json()
                                            })
                                            .then((data) => {
                                                const array: Array<SearchResult> = []
                                                if (data) {
                                                    data.map((datum: FetchDefinitionResultItem) => {
                                                        array.push({ character: datum["character"], definition: datum["kdefinition"], pronunciation: datum["kmandarin"] })
                                                    })
                                                    setSearchResults(array)
                                                }
                                            })
                                    }
                                }}>
                                    <label htmlFor="characterInput">Search by character or English definition</label>
                                    <div className="flex py-4">
                                        <input className="border border-cyan-950 px-2" id="characterInput" type="text" name="newCharacter" pattern="^[a-zA-Z]+$|^[\u4E00-\u9FFF]{1}$"></input>
                                        <button className="bg-cyan-950 p-2" type="submit">
                                            <SvgSearch className="w-4 h-4 *:stroke-neutral-100" />
                                            <span className="sr-only">Search</span>
                                        </button>
                                    </div>
                                </form>
                                <Suspense fallback={<p>Loading</p>}>
                                    <div className="flex flex-col gap-4 py-2">
                                        {(searchResults && searchResults.length === 0) && (<div>No results found</div>)}
                                        {searchResults && searchResults.map((searchItem, index) => {
                                            return (
                                                <button className="bg-slate-200 text-cyan-950 flex gap-4 rounded-xl shadow-lg px-4 py-2 items-center" key={`search-result-${index}`} onClick={() => {
                                                    onAddToCharacterSet(searchItem["character"])
                                                    setSearchResults([])
                                                    closeModal()
                                                }}>
                                                    <h2 className="text-3xl">{searchItem["character"]}</h2>
                                                    <div className="flex flex-col text-left">
                                                        <h3 className="text-lg">{searchItem["pronunciation"]}</h3>
                                                        <h4 className="text-base">{searchItem["definition"]}</h4>
                                                    </div>
                                                </button>
                                            )
                                        })
                                        }
                                    </div>
                                </Suspense>
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </div>
        </Dialog>
    </Transition>)
}