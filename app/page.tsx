'use client'
import Image from "next/image";
import HanziWriter from "hanzi-writer"
import React, { useEffect, useState, useRef } from 'react';

const characterArray = ['的', '一', '是', '不', '	了']

export default function Home() {
  const [showCard, setShowCard] = useState(false)
  const [chosenCharacter, setChosenCharacter] = useState('')
  const [characterMetadata, setCharacterMetadata] = useState(null)
  const targetDivRef = useRef(null);
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
        <div className="py-20 px-20 min-h-7 max-w-sm mx-auto bg-red-200 rounded-xl shadow-lg space-y-5 ">
          <div ref={targetDivRef}></div>
        </div>}
      {characterArray.map((character) =>
        <button key={`button-${character}`} onClick={() => { setShowCard(true); setChosenCharacter(character) }}>{character}</button>
      )}
    </main>
  );
}
