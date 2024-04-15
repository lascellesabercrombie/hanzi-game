import React, { Fragment, useContext } from 'react';
import { Dialog, Transition } from '@headlessui/react'
import { CharacterContext, CharacterContextType } from './ParentWrapper'

interface DeleteModalProps {
    characterSet: Set<string>,
    isModalOpen: boolean,
    closeModal: () => void,
    onDeleteCharacter: () => void
}

export const DeleteModal = ({ characterSet, isModalOpen, closeModal, onDeleteCharacter }: DeleteModalProps) => {
    const { chosenCharacter } = useContext(CharacterContext) as CharacterContextType


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
                                {`Do you want to remove "${chosenCharacter}" from your library?`}
                            </Dialog.Title>
                            <div className="flex mt-6 justify-between">
                                <button
                                    type="button"
                                    data-testid="button-cancel"
                                    className="inline-flex justify-center rounded-md border border-cyan-950 bg-neutral-100 px-4 py-2 text-sm font-medium text-cyan-950 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                    onClick={closeModal}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    data-testid="button-confirm"
                                    className="inline-flex justify-center rounded-md border border-red-700 bg-neutral-100  px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-700 hover:text-neutral-100 hover:border-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                    onClick={() => {
                                        if (characterSet.size == 1) {
                                            localStorage.setItem('characters', JSON.stringify({}));
                                        }
                                        onDeleteCharacter()
                                        closeModal()
                                    }}
                                >
                                    Yes, remove
                                </button>
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </div>
        </Dialog>
    </Transition>)
}