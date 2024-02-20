'use client'
import Image from "next/image";
import HanziWriter from "hanzi-writer"
import React, { useEffect, useState, useRef } from 'react';

const characterArray = ['的', '一', '是', '不', '	了']
type CharacterMetadata = {
  definition: string,
  pronunciation: Array<string>
}

export default function Home() {
  const [showCard, setShowCard] = useState(false)
  const [chosenCharacter, setChosenCharacter] = useState('')

  const [characterMetadata, setCharacterMetadata] = useState<null | CharacterMetadata>(null)
  const [isPronunciationVisible, setIsPronunciationVisible] = useState(false)
  const [isDefinitionVisible, setIsDefinitionVisible] = useState(false)
  const targetDivRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (chosenCharacter) {
      fetch(`http://ccdb.hemiola.com/characters/string/${chosenCharacter}?fields=kDefinition,kMandarin`)
        .then((response) => { console.log("response", response); return response.json() })
        .then((data) => {
          setCharacterMetadata({ "definition": data?.[0]?.["kDefinition"], "pronunciation": data?.[0]?.["kMandarin"]?.split(" ") })
        })
        .then(() => console.log('characterMetadata', characterMetadata))
    }
  }, [chosenCharacter])
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
        });
        writer.quiz()
        return () => {
          writer.cancelQuiz();
          writer.hideCharacter();
        };
      }
    }
  }, [chosenCharacter, showCard]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-8">
      <div className="flex flex-col">
        <h1 className="mx-auto">Character-full</h1>
        <h2>Practise writing Chinese characters</h2>
      </div>
      {showCard &&
        <section className="flex flex-col">
          <div className="flex flex-col pt-20 pb-4 px-4 max-h-72 min-w-64 min-h-64 max-w-sm mx-auto bg-red-200 rounded-xl shadow-lg space-y-5 ">
            <div className="flex justify-center" ref={targetDivRef}></div>
            <div className="flex flex-col justify-center">
              {isPronunciationVisible && <p>{characterMetadata?.pronunciation?.[0]}</p>}
              {isDefinitionVisible && <p>{characterMetadata?.definition}</p>}
            </div>
          </div>
          <div className="flex flex-col items-start py-4 gap-4">
            <button className="py-2 px-2 bg-blue-200 rounded-lg" onClick={() => { setIsPronunciationVisible(!isPronunciationVisible) }}>{`${!isPronunciationVisible ? "Show" : "Hide"} pronunciation`}</button>
            <button className="py-2 px-2 bg-blue-200 rounded-lg" onClick={() => { setIsDefinitionVisible(!isDefinitionVisible) }}>{`${!isDefinitionVisible ? "Show" : "Hide"} definition`}</button>
          </div>
        </section>}
      <section className="flex flex-col">
        <div className="flex flex-col pb-4">
          <h2 className="mx-auto">Your characters</h2>
          <h3>Select a character to practise it</h3>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {characterArray.map((character) =>
            <button className="py-4 px-4 min-w-3 min-h-3 max-w-sm bg-blue-200 rounded-xl" key={`button-${character}`} onClick={() => { setShowCard(true); setChosenCharacter(character) }}>{character}</button>
          )}
        </div>
      </section>
    </main>
  );
}
