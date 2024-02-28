'use client'
import { validateInput } from "@/src/helpers/validateInput";
import { convertPinyin } from "@/src/helpers/ccdbUtils";
import { Suspense, useEffect, useState } from "react";

type SearchResult = {
    character: string,
    definition?: string,
    pronunciation?: string,
}

type FetchDefinitionResultItem = {
    string: string,
    kDefinition?: string,
    kMandarin?: string
}

export default function Library() {
    const [characterSet, setCharacterSet] = useState(new Set<string>())
    const [searchResults, setSearchResults] = useState<null | Array<SearchResult>>(null)


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
        }
    }, [characterSet]);

    return (
        <section className="flex flex-col">
            <div className="flex flex-col pb-4">
                <h2 className="mx-auto">Your characters</h2>
                <h3>Select a character to practise it</h3>
            </div>
            <form action={(formData) => {
                const query = formData.get("newCharacter");
                if (typeof query === "string" && validateInput(query) === "chinese") {
                    setCharacterSet((characterSet) => {
                        const newSet = new Set(characterSet);
                        newSet.add(query);
                        return newSet;
                    });
                }
                if (typeof query === "string" && validateInput(query) === "english") {
                    fetch(`http://ccdb.hemiola.com/characters/definition/${query}?fields=string,kDefinition,kMandarin`)
                        .then((response) => { setSearchResults([]); return response.json(); })
                        .then((data) => {
                            const array: Array<SearchResult> = []
                            if (data) {
                                data.map((datum: FetchDefinitionResultItem) => {
                                    array.push({ character: datum["string"], definition: datum["kDefinition"], pronunciation: convertPinyin(datum?.["kMandarin"]?.split(" ")?.[0]) })
                                })
                                setSearchResults(array)
                            }
                        })
                }
            }}>
                <label htmlFor="characterInput">Add a character to your library</label>
                <input id="characterInput" type="text" name="newCharacter" pattern="^[a-zA-Z]+$|^[\u4E00-\u9FFF]{1}$"></input>
                <button type="submit">submit</button>
            </form>
            <Suspense fallback={<p>Loading</p>}>
                {(searchResults && searchResults.length === 0) && (<div>No results found</div>)}
                {searchResults && searchResults.map((searchItem, index) => {
                    return (
                        <button key={`search-result-${index}`} onClick={() => {
                            setCharacterSet((characterSet) => {
                                const newSet = new Set(characterSet);
                                newSet.add(searchItem["character"]);
                                return newSet;
                            })
                            setSearchResults([])
                        }}>
                            <h2>{searchItem["character"]}</h2>
                            <h3>{searchItem["definition"]}</h3>
                            <h3>{searchItem["pronunciation"]}</h3>
                        </button>
                    )
                })
                }
            </Suspense>
            <div className="grid grid-cols-4 gap-4">
                {Array.from(characterSet).map((character) =>
                    <div className="py-4 px-4 min-w-3 min-h-3 max-w-sm bg-blue-200 rounded-xl" key={`button-${character}`}
                    // onClick={() => {setShowCard(true); setChosenCharacter(character) }}
                    >{character}</div>
                )}
            </div>
        </section>)
}