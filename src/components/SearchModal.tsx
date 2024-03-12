import { Fragment, Suspense, useContext, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react'
import { CharacterContext, CharacterContextType } from './ParentWrapper'
import { validateInput } from '../helpers/validateInput';
import { convertPinyin } from '../helpers/ccdbUtils';

interface SearchModalProps {
    isModalOpen: boolean,
    closeModal: () => void,
    onAddToCharacterSet: (itemToAdd: string) => void
}

type SearchResult = {
    character: string,
    definition?: string,
    pronunciation?: string,
}

type FetchDefinitionResultItem = {
    string: string,
    kDefinition?: string,
    kMandarin?: string
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
                        <Dialog.Panel className="w-full max-w-sm transform overflow-hidden rounded-2xl bg-neutral-200 text-cyan-950 p-10 text-left align-middle shadow-xl transition-all">
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
                                        fetch(`http://ccdb.hemiola.com/characters/definition/${query}?fields=string,kDefinition,kMandarin`)
                                            .then((response) => { setSearchResults([]); return response.json(); })
                                            .then((data) => {
                                                const array: Array<SearchResult> = []
                                                if (data) {
                                                    data.map((datum: FetchDefinitionResultItem) => {
                                                        array.push({ character: datum["string"], definition: datum["kDefinition"], pronunciation: convertPinyin(datum?.["kMandarin"]?.split(" ")?.[0]) })
                                                    })
                                                    setSearchResults(array)
                                                }
                                            })
                                    }
                                }}>
                                    <label htmlFor="characterInput">Search by character or English definition</label>
                                    <div className="flex">
                                        <input id="characterInput" type="text" name="newCharacter" pattern="^[a-zA-Z]+$|^[\u4E00-\u9FFF]{1}$"></input>
                                        <button type="submit">submit</button>
                                    </div>
                                </form>
                                <Suspense fallback={<p>Loading</p>}>
                                    <div className="flex flex-col gap-2 py-2 px-4">
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