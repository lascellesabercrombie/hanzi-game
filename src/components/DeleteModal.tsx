import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react'
import { CharacterContext, CharacterContextType } from './ParentWrapper'
import { ModalButton } from './buttons/ModalButton';

interface DeleteModalProps {
    characterSet: Set<string> | null,
    isModalOpen: boolean,
    closeModal: () => void,
    selectedCharacterSet?: Set<string>,
    onConfirmDelete: () => void
}

export const DeleteModal = ({ characterSet, isModalOpen, selectedCharacterSet, closeModal, onConfirmDelete }: DeleteModalProps) => {
    const { chosenCharacter } = useContext(CharacterContext) as CharacterContextType
    const [dialogText, setDialogText] = useState("")

    useEffect(() => {
        if (selectedCharacterSet && selectedCharacterSet.size === 1) {
            setDialogText(`"${selectedCharacterSet.values().next().value}"`)
        } else if (selectedCharacterSet && selectedCharacterSet.size > 1) {
            setDialogText(`${selectedCharacterSet.size} characters`)
        } else if (chosenCharacter) {
            setDialogText(`"${chosenCharacter}"`)
        }
    }, [chosenCharacter, selectedCharacterSet])

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
                                {`Do you want to remove ${dialogText} from your library?`}
                            </Dialog.Title>
                            <div className="flex mt-6 justify-between">
                                <ModalButton
                                    dataTestId="button-cancel"
                                    onClick={closeModal}
                                >
                                    Cancel
                                </ModalButton>
                                <ModalButton
                                    dataTestId="button-confirm"
                                    isDeleteStyle
                                    onClick={() => {
                                        onConfirmDelete()
                                        closeModal()
                                    }}
                                >
                                    Yes, remove
                                </ModalButton>
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </div>
        </Dialog>
    </Transition>)
}