'use client'
import HanziWriter from "hanzi-writer"
import React, { useContext, useEffect, useState, useRef } from 'react';
import { getInitialStateBool } from "@/src/helpers/getInitialStateBool";
import { getInitialStateNumber } from "@/src/helpers/getInitialStateNumber";
import { CharacterContext, CharacterContextType } from "../../components/ParentWrapper";
import SvgReset from "@/public/character/SvgReset";
import SvgDelete from "@/public/character/SvgDelete";
import { DeleteModal } from "@/src/components/DeleteModal";
import { IconButton } from "@/src/components/IconButton";
import { Title } from "@/src/components/Title";
import { CharacterGrid } from "@/src/components/CharacterGrid";

type CharacterMetadata = {
  definition?: string,
  pronunciation?: string
}

export default function Home() {
  const [showCard, setShowCard] = useState(false)
  const { characterSet, chosenCharacter, onSelectChosenCharacter, onSetCharacterSet } = useContext(CharacterContext) as CharacterContextType

  const [characterMetadata, setCharacterMetadata] = useState<null | CharacterMetadata>(null)
  const [totalMistakes, setTotalMistakes] = useState<null | number>(null)
  const [isReset, setIsReset] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const targetDivRef = useRef<null | HTMLDivElement>(null);
  const [characterSize, setCharacterSize] = useState(getInitialStateNumber('characterSize', 200))
  const [isDefinitionVisible, setIsDefinitionVisible] = useState(getInitialStateBool('isDefinitionVisible', true))
  const [isPronunciationVisible, setIsPronunciationVisible] = useState(getInitialStateBool('isPronunciationVisible', true))
  const [isCharacterOutlineVisible, setIsCharacterOutlineVisible] = useState(getInitialStateBool('isCharacterOutlineVisible', true))

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const onDeleteCharacter = () => {
    const newSet = new Set(characterSet);
    newSet.delete(chosenCharacter);
    onSetCharacterSet(newSet);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/search-by-character/?query=${chosenCharacter}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();
        setCharacterMetadata(
          {
            "definition": jsonData?.["kdefinition"],
            "pronunciation": jsonData?.["kmandarin"]
          })
        setShowCard(true)
      } catch (error) {
        throw new Error
      }
    };
    if (chosenCharacter) {
      fetchData();
    }
  }, [chosenCharacter]);

  useEffect(() => {
    if (characterSet.size === 0) {
      setShowCard(false)
    }

  }, [characterSet]);

  useEffect(() => {
    if (characterSet.size > 0 && !characterSet.has(chosenCharacter)) {
      onSelectChosenCharacter(characterSet.values().next().value)
    }
  }, [characterSet, chosenCharacter, onSelectChosenCharacter])

  useEffect(() => {
    if (showCard) {
      const targetDiv: null | HTMLDivElement = targetDivRef.current
      if (targetDiv) {
        targetDiv.replaceChildren('')
      }
      if (targetDiv !== null) {
        const writer = HanziWriter.create(targetDiv, chosenCharacter, {
          width: characterSize,
          height: characterSize,
          padding: 0,
          showOutline: isCharacterOutlineVisible
        });
        writer.quiz({
          onComplete: function (summaryData) {
            setTotalMistakes(summaryData.totalMistakes);
          }
        })
        if (isReset) {
          writer.setCharacter(chosenCharacter)
          setIsReset(false)
        }

        return () => {
          writer.cancelQuiz();
          writer.hideCharacter();
          setTotalMistakes(null)
        };
      }
    }
  }, [characterSize, chosenCharacter, isReset, isCharacterOutlineVisible, showCard]);

  return (
    <main className="flex flex-col">
      {/* <section className=" w-screen"> */}
      <Title>Practise writing Chinese characters</Title>
      {showCard &&
        <div className="flex flex-col pt-4 pb-2 px-2">
          <div className="bg-neutral-100 flex p-5 mx-auto rounded-xl shadow-lg items-center justify-center">
            <div className="flex justify-center" ref={targetDivRef}></div>
            <div className="flex flex-col justify-center">
            </div>
          </div>
          <div className="flex flex-col items-center py-2 gap-2">
            <div className="flex gap-2">
              <IconButton ariaLabel="Reset" dataTestId="button-reset-character" onClick={() => {
                setIsReset(true)
              }}>
                <SvgReset className="*:fill-cyan-950 max-w-5 max-h-5" />
              </IconButton>
              <IconButton ariaLabel="Remove character from your library" dataTestId="button-remove-character" onClick={() => {
                setIsModalOpen(true)
              }}>
                <SvgDelete className="*:fill-cyan-950 max-w-6 max-h-6" />
              </IconButton>
            </div>
            {isPronunciationVisible && <span className="text-lg " data-testid="span-pronunciation">{characterMetadata?.pronunciation}</span>}
            {isDefinitionVisible && <span className="max-w-80 text-base" data-testid="span-definition">{characterMetadata?.definition}</span>}

            {Number.isInteger(totalMistakes) && <p>You made {totalMistakes} {totalMistakes === 1 ? "mistake" : "mistakes"} on this character</p>}
          </div>
        </div>
      }
      {!showCard && characterSet.size === 0 &&
        <p className="max-w-sm">Your library is empty. Add characters to be able to practise them. Alternatively, reload and your library will be restocked with five common characters.</p>
      }
      <CharacterGrid />
      <DeleteModal characterSet={characterSet} isModalOpen={isModalOpen} closeModal={closeModal} onDeleteCharacter={onDeleteCharacter} />
    </main >
  );
}
