'use client'
import HanziWriter from "hanzi-writer"
import React, { useContext, useEffect, useState, useRef } from 'react';
import { convertPinyin } from '../../helpers/ccdbUtils'
import { getInitialState } from "@/src/helpers/getInitialState";
import { CharacterContext, CharacterContextType } from "../../components/ParentWrapper";
import SvgReset from "@/public/character/SvgReset";
import SvgDelete from "@/public/character/SvgDelete";
import { DeleteModal } from "@/src/components/DeleteModal";
import Carousel from "@/src/components/Carousel";
import { IconButton } from "@/src/components/IconButton";
import { Title } from "@/src/components/Title";

type CharacterMetadata = {
  definition?: string,
  pronunciation?: string
}

export default function Home() {
  const [showCard, setShowCard] = useState(false)
  const { chosenCharacter, onSelectChosenCharacter } = useContext(CharacterContext) as CharacterContextType
  const [characterSet, setCharacterSet] = useState(new Set<string>())
  const [characterMetadata, setCharacterMetadata] = useState<null | CharacterMetadata>(null)
  const [totalMistakes, setTotalMistakes] = useState<null | number>(null)
  const [isReset, setIsReset] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const targetDivRef = useRef<null | HTMLDivElement>(null);

  const [isDefinitionVisible, setIsDefinitionVisible] = useState(getInitialState('isDefinitionVisible', true))
  const [isPronunciationVisible, setIsPronunciationVisible] = useState(getInitialState('isPronunciationVisible', true))
  const [isCharacterOutlineVisible, setIsCharacterOutlineVisible] = useState(getInitialState('isCharacterOutlineVisible', true))

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const openModal = () => {
    setIsModalOpen(true)
  }

  const onDeleteCharacter = () => {
    setCharacterSet((characterSet) => {
      const newSet = new Set(characterSet);
      newSet.delete(chosenCharacter);
      return newSet;
    });
  }

  useEffect(() => {
    if (chosenCharacter) {
      fetch(`http://ccdb.hemiola.com/characters/string/${chosenCharacter}?fields=kDefinition,kMandarin`)
        .then((response) => response.json())
        .then((data) => {
          // currently only takes the first possible pronunciation of a character provided
          setCharacterMetadata(
            {
              "definition": data?.[0]?.["kDefinition"],
              "pronunciation": convertPinyin(data?.[0]?.["kMandarin"]?.split(" ")?.[0])
            })
          setShowCard(true)
        })
    }
  }, [chosenCharacter])

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
    } else {
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
          width: 200,
          height: 200,
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
  }, [chosenCharacter, isReset, isCharacterOutlineVisible, showCard]);

  return (
    <main className="flex flex-col">
      {/* <section className=" w-screen"> */}
      <Title>Practise writing Chinese characters</Title>
      {showCard &&
        <div className="flex flex-col pt-4 pb-2 px-2">
          <div className="bg-neutral-100 flex max-h-72 min-w-64 min-h-64 max-w-sm mx-auto rounded-xl shadow-lg items-center justify-center">
            <div className="flex justify-center" ref={targetDivRef}></div>
            <div className="flex flex-col justify-center">
            </div>
          </div>
          <div className="flex flex-col items-center py-2 gap-2">
            <div className="flex gap-2">
              <IconButton ariaLabel="Reset" onClick={() => {
                setIsReset(true)
              }}>
                <SvgReset className="*:fill-cyan-950 max-w-5 max-h-5" />
              </IconButton>
              <IconButton ariaLabel="Remove character from your library" onClick={() => {
                setIsModalOpen(true)
              }}>
                <SvgDelete className="*:fill-cyan-950 max-w-6 max-h-6" />
              </IconButton>
            </div>
            {isPronunciationVisible && <span className="text-lg text-cyan-950">{characterMetadata?.pronunciation}</span>}
            {isDefinitionVisible && <span className="max-w-80 text-base text-cyan-950">{characterMetadata?.definition}</span>}

            {Number.isInteger(totalMistakes) && <p>You made {totalMistakes} {totalMistakes === 1 ? "mistake" : "mistakes"} on this character</p>}
          </div>
        </div>
      }
      {!showCard && characterSet.size === 0 &&
        <p className="max-w-sm">Your library is empty. Add characters to be able to practise them. Alternatively, reload and your library will be restocked with five common characters.</p>
      }
      {/* </section> */}
      <Carousel>
        {Array.from(characterSet).map((character, index) =>
          <button className="py-4 px-4 w-1/4 bg-neutral-100 rounded-xl shadow-md text-cyan-950 text-5xl" key={`button-${index}`} onClick={() => { setShowCard(true); onSelectChosenCharacter(character) }}>{character}</button>
        )}
      </Carousel>
      {/* <section className="flex flex-col">
        <div className="flex flex-col pb-4">
          <h2 className="mx-auto">Your characters</h2>
          <h3>Select a character to practise it</h3>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {Array.from(characterSet).map((character) =>
            <button className="py-4 px-4 min-w-3 min-h-3 max-w-sm bg-blue-200 rounded-xl" key={`button-${character}`} onClick={() => { setShowCard(true); onSelectChosenCharacter(character) }}>{character}</button>
          )}
        </div>
      </section> */}
      <DeleteModal characterSet={characterSet} isModalOpen={isModalOpen} closeModal={closeModal} onDeleteCharacter={onDeleteCharacter} />
    </main >
  );
}
