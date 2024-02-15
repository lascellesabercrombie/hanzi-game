'use client'
import Image from "next/image";
import HanziWriter from "hanzi-writer"
import React, { useEffect, useState, useRef } from 'react';

export default function Home() {
  const [showCard, setShowCard] = useState(false)
  const targetDivRef = useRef(null);
  useEffect(() => {
    if (showCard) {
      const writer = HanziWriter.create(targetDivRef.current, '我', {
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
  }, [showCard]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <button onClick={() => { setShowCard(true) }}>Show card</button>
      {showCard &&
        <div className="py-20 px-20 min-h-7 max-w-sm mx-auto bg-red-200 rounded-xl shadow-lg space-y-5 ">
          <div ref={targetDivRef}></div>
        </div>}

    </main>
  );
}
