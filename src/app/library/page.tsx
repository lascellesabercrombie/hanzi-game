'use client'
import { validateInput } from "@/src/helpers/validateInput";
import { convertPinyin } from "@/src/helpers/ccdbUtils";
import { Suspense, useContext, useEffect, useState } from "react";
import { CharacterContext, CharacterContextType } from "../../components/ParentWrapper";
import { useRouter } from 'next/navigation'
import { Title } from "@/src/components/Title";


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
    const { onSelectChosenCharacter } = useContext(CharacterContext) as CharacterContextType
    const router = useRouter()

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
                <Title>Library</Title>
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
                <div className="flex flex-col gap-2 py-2 px-4">
                    {(searchResults && searchResults.length === 0) && (<div>No results found</div>)}
                    {searchResults && searchResults.map((searchItem, index) => {
                        return (
                            <button className="bg-slate-200 text-cyan-950 flex gap-4 rounded-xl shadow-lg px-4 py-2 items-center" key={`search-result-${index}`} onClick={() => {
                                setCharacterSet((characterSet) => {
                                    const newSet = new Set(characterSet);
                                    newSet.add(searchItem["character"]);
                                    return newSet;
                                })
                                setSearchResults([])
                            }}>
                                <h2 className="text-3xl">{searchItem["character"]}</h2>
                                <div className="flex flex-col text-left">
                                    <h3 className="text-lg">{searchItem["pronunciation"]}</h3>
                                    <h4 className="text-base">{searchItem["definition"]}</h4>
                                </div>
                            </button>
                        )
                    })
                    }
                </div>
            </Suspense>
            <h3>Press a character to practise writing it</h3>
            <div className="grid grid-cols-3 gap-6 px-6 py-2 ">
                {Array.from(characterSet).map((character) =>
                    <button className="py-6 px-2 bg-blue-100 rounded-xl text-3xl text-cyan-950 shadow-lg" key={`button-${character}`}
                        onClick={() => {
                            onSelectChosenCharacter(character);
                            router.push('/practice')
                        }}
                    >{character}</button>
                )}
            </div>
        </section>)
}