import { useRouter } from 'next/navigation'
import { useContext } from 'react'
import { CharacterContext, CharacterContextType } from "./ParentWrapper";

interface CharacterGridProps {
    isSelecting?: boolean,
    selectedCharacterSet?: Set<string>,
    selectCharacters?: (character: string) => void
}

export const CharacterGrid = ({ isSelecting = false, selectedCharacterSet, selectCharacters }: CharacterGridProps) => {
    const selectedStyling = "border-double border-4 border-cyan-950"
    const { characterSet, chooseCharacter } = useContext(CharacterContext) as CharacterContextType
    const router = useRouter()
    return (<div className="p-6">
        <div className="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8 justify-items-center min-w-[80vw] px-6 py-4 border-2 border-slate-200 rounded-xl" data-testid="div-character-grid">
            {Array.from(characterSet).map((character) =>
                <button className={`py-2 px-2 min-w-[min(20vw,10rem)] min-h-[min(20vw,10rem)] bg-blue-100 rounded-xl text-[min(5rem,10vw)] text-cyan-950 drop-shadow-md hover:drop-shadow-xl active:drop-shadow-sm ${selectedCharacterSet && selectedCharacterSet.has(character) ? selectedStyling : ""}`} key={`button-${character}`}
                    onClick={isSelecting && selectCharacters ? () => {
                        selectCharacters(character)
                    } : () => {
                        chooseCharacter(character);
                        router.push('/practice')
                    }}
                >
                    {character}
                </button>
            )}
        </div>
    </div>)
}