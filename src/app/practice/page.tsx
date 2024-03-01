'use client'
import HanziWriter from "hanzi-writer"
import React, { useContext, useEffect, useState, useRef } from 'react';
import { convertPinyin } from '../../helpers/ccdbUtils'
import { getInitialState } from "@/src/helpers/getInitialState";
import { CharacterContext, CharacterContextType } from "../../components/ParentWrapper";
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
  const targetDivRef = useRef<null | HTMLDivElement>(null);

  const [isDefinitionVisible, setIsDefinitionVisible] = useState(getInitialState('isDefinitionVisible', true))
  const [isPronunciationVisible, setIsPronunciationVisible] = useState(getInitialState('isPronunciationVisible', true))
  const [isCharacterOutlineVisible, setIsCharacterOutlineVisible] = useState(getInitialState('isCharacterOutlineVisible', true))

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
          width: 100,
          height: 100,
          padding: 5,
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
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="flex flex-col">
        <h1 className="mx-auto">Character-full</h1>
        <h2>Practise writing Chinese characters</h2>
      </div>
      <section>
        {showCard &&
          <div className="flex flex-col">
            <div className="flex flex-col pt-20 pb-4 px-4 max-h-72 min-w-64 min-h-64 max-w-sm mx-auto bg-red-200 rounded-xl shadow-lg space-y-5 ">
              <div className="flex justify-center" ref={targetDivRef}></div>
              <div className="flex flex-col justify-center">
                {isPronunciationVisible && <p>{characterMetadata?.pronunciation}</p>}
                {isDefinitionVisible && <p>{characterMetadata?.definition}</p>}
              </div>
            </div>
            <div className="flex flex-col items-start py-4 gap-4">
              <button className="py-2 px-2 bg-blue-200 rounded-lg" onClick={() => {
                setIsReset(true)
              }}>Reset</button>
              <button className="py-2 px-2 bg-blue-200 rounded-lg" onClick={() => {
                if (characterSet.size == 1) {
                  localStorage.setItem('characters', JSON.stringify({}));
                }
                setCharacterSet((characterSet) => {
                  const newSet = new Set(characterSet);
                  newSet.delete(chosenCharacter);
                  return newSet;
                });
              }}>Remove character from your library</button>
              {Number.isInteger(totalMistakes) && <p>You made {totalMistakes} {totalMistakes === 1 ? "mistake" : "mistakes"} on this character</p>}
            </div>
          </div>
        }
        {!showCard && characterSet.size === 0 &&
          <p className="max-w-sm">Your library is empty. Add characters to be able to practise them. Alternatively, reload and your library will be restocked with five common characters.</p>
        }
      </section>
      <section className="flex flex-col">
        <div className="flex flex-col pb-4">
          <h2 className="mx-auto">Your characters</h2>
          <h3>Select a character to practise it</h3>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {Array.from(characterSet).map((character) =>
            <button className="py-4 px-4 min-w-3 min-h-3 max-w-sm bg-blue-200 rounded-xl" key={`button-${character}`} onClick={() => { setShowCard(true); onSelectChosenCharacter(character) }}>{character}</button>
          )}
        </div>
      </section>
    </main >
  );
}
