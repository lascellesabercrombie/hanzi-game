'use client'
import Image from "next/image";
import HanziWriter from "hanzi-writer"
import React, { useEffect, useState, useRef } from 'react';

const characterArray = ['的', '一', '是', '不', '	了']

export default function Home() {
  const [showCard, setShowCard] = useState(false)
  const [chosenCharacter, setChosenCharacter] = useState('')
  const [characterMetadata, setCharacterMetadata] = useState(null)
  const [isPronunciationVisible, setIsPronunciationVisible] = useState(false)
  const [isDefinitionVisible, setIsDefinitionVisible] = useState(false)
  const targetDivRef = useRef(null);

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
      const targetDiv = targetDivRef.current
      if (targetDiv) {
        targetDiv.replaceChildren('')
      }

      const writer = HanziWriter.create(targetDiv, chosenCharacter, {
        width: 100,
        height: 100,
        padding: 5,
      });
      writer.quiz()
      // Clean up function
      return () => {
        writer.cancelQuiz();
        writer.hideCharacter();
      };
    }
  }, [chosenCharacter, showCard]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {showCard &&
        <section>
          <div className="flex flex-col py-20 px-4 min-w-6 min-h-7 max-w-sm mx-auto bg-red-200 rounded-xl shadow-lg space-y-5 ">
            <div className="flex justify-center" ref={targetDivRef}></div>
            <div className="flex flex-col justify-center">
              {isPronunciationVisible && <p>{characterMetadata?.pronunciation?.[0]}</p>}
              {isDefinitionVisible && <p>{characterMetadata?.definition}</p>}
            </div>
          </div>
          <button onClick={() => { setIsPronunciationVisible(!isPronunciationVisible) }}>{`${!isPronunciationVisible ? "Show" : "Hide"} pronunciation`}</button>
          <button onClick={() => { setIsDefinitionVisible(!isDefinitionVisible) }}>{`${!isDefinitionVisible ? "Show" : "Hide"} Definition`}</button>
        </section>}
      {characterArray.map((character) =>
        <button key={`button-${character}`} onClick={() => { setShowCard(true); setChosenCharacter(character) }}>{character}</button>
      )}
    </main>
  );
}
