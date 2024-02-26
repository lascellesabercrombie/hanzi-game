'use client'
import HanziWriter from "hanzi-writer"
import React, { useEffect, useState, useRef } from 'react';
import { convertPinyin } from './helpers/ccdbUtils'


type CharacterMetadata = {
  definition: string,
  pronunciation: string
}

type SearchResult = {
  character: string,
  definition: string,
  pronunciation: string
}

type FetchDefinitionResultItem = {
  string: string,
  kDefinition: string,
  kMandarin: string
}

export default function Home() {
  const [showCard, setShowCard] = useState(false)
  const [chosenCharacter, setChosenCharacter] = useState('')
  const [characterSet, setCharacterSet] = useState(new Set<string>())
  const [characterMetadata, setCharacterMetadata] = useState<null | CharacterMetadata>(null)
  const [isPronunciationVisible, setIsPronunciationVisible] = useState(false)
  const [isDefinitionVisible, setIsDefinitionVisible] = useState(false)
  const [totalMistakes, setTotalMistakes] = useState<null | number>(null)
  const [isShowCharacterOutline, setIsShowCharacterOutline] = useState(true)
  const [searchResults, setSearchResults] = useState<Array<SearchResult>>([])
  const [isReset, setIsReset] = useState(false)
  const targetDivRef = useRef<null | HTMLDivElement>(null);

  const validate = (input: string) => {
    const chineseCharacterRegex = /^[\u4e00-\u9fa5]{0,1}$/
    const englishWordRegex = /^[a-zA-Z]+$/

    if (chineseCharacterRegex.test(input)) {
      return "chinese"
    }
    if (englishWordRegex.test(input)) {
      return "english"
    }

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
              "pronunciation": convertPinyin(data?.[0]?.["kMandarin"].split(" ")[0])
            })
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
      setChosenCharacter(characterSet.values().next().value)
    }
  }, [characterSet, chosenCharacter])

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
          showOutline: isShowCharacterOutline
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
  }, [chosenCharacter, isReset, isShowCharacterOutline, showCard]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-8">
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
              <button className="py-2 px-2 bg-blue-200 rounded-lg" onClick={() => { setIsPronunciationVisible(!isPronunciationVisible) }}>{`${!isPronunciationVisible ? "Show" : "Hide"} pronunciation`}</button>
              <button className="py-2 px-2 bg-blue-200 rounded-lg" onClick={() => { setIsDefinitionVisible(!isDefinitionVisible) }}>{`${!isDefinitionVisible ? "Show" : "Hide"} definition`}</button>
              <button className="py-2 px-2 bg-blue-200 rounded-lg" onClick={() => {
                setIsReset(true)
              }}>Reset</button>
              <button className="py-2 px-2 bg-blue-200 rounded-lg" onClick={() => {
                setIsShowCharacterOutline(!isShowCharacterOutline)
              }}>{`${isShowCharacterOutline ? "Hide" : "Show"} character outline`}</button>
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
        <form action={(formData) => {
          const query = formData.get("newCharacter");
          if (typeof query === "string" && validate(query) === "chinese") {
            setCharacterSet((characterSet) => {
              const newSet = new Set(characterSet);
              newSet.add(query);
              return newSet;
            });
          }
          if (typeof query === "string" && validate(query) === "english") {
            fetch(`http://ccdb.hemiola.com/characters/definition/${query}?fields=string,kDefinition,kMandarin`)
              .then((response) => { setSearchResults([]); return response.json(); })
              .then((data) => {
                const array: Array<SearchResult> = []
                data.map((datum: FetchDefinitionResultItem) => {
                  array.push({ character: datum["string"], definition: datum["kDefinition"], pronunciation: convertPinyin(datum?.["kMandarin"].split(" ")[0]) })
                })
                setSearchResults(array)
              })
          }
        }}>
          <label htmlFor="characterInput">Add a character to your library</label>
          <input id="characterInput" type="text" name="newCharacter" pattern="^[a-zA-Z]+$|^[\u4E00-\u9FFF]{1}$"></input>
          <button type="submit">submit</button>
        </form>
        {
          searchResults.length === 0 ? (<div>No results found</div>) : searchResults.map((searchItem, index) => {
            return (
              <button key={`search-result-${index}`} onClick={() => {
                setCharacterSet((characterSet) => {
                  const newSet = new Set(characterSet);
                  newSet.add(searchItem["character"]);
                  return newSet;
                })
              }}>
                <h2>{searchItem["character"]}</h2>
                <h3>{searchItem["definition"]}</h3>
                <h3>{searchItem["pronunciation"]}</h3>
              </button>
            )
          })
        }
        <div className="grid grid-cols-4 gap-4">
          {Array.from(characterSet).map((character) =>
            <button className="py-4 px-4 min-w-3 min-h-3 max-w-sm bg-blue-200 rounded-xl" key={`button-${character}`} onClick={() => { setShowCard(true); setChosenCharacter(character) }}>{character}</button>
          )}
        </div>
      </section>
    </main >
  );
}
