import { useRouter } from 'next/navigation'
import { useContext } from 'react'
import { CharacterContext, CharacterContextType } from "./ParentWrapper";

interface CharacterGridProps {
    isSelecting?: boolean,
    selectCharacterSet?: Set<string>,
    onSelectMultipleCharacters?: (character: string) => void
}

export const CharacterGrid = ({ isSelecting = false, selectCharacterSet, onSelectMultipleCharacters }: CharacterGridProps) => {
    console.log('isSelecting', isSelecting)
    const selectedStyling = "border-double border-4 border-cyan-950"
    const { characterSet, onSelectChosenCharacter } = useContext(CharacterContext) as CharacterContextType
    const router = useRouter()
    return (<div className="p-6">
        <div className="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8 justify-items-center min-w-[80vw] px-6 py-4 border-2 border-slate-200 rounded-xl" data-testid="div-character-grid">
            {Array.from(characterSet).map((character) =>
                <button className={`py-2 px-2 min-w-[min(20vw,10rem)] min-h-[min(20vw,10rem)] bg-blue-100 rounded-xl text-[min(5rem,10vw)] text-cyan-950 drop-shadow-md hover:drop-shadow-xl active:drop-shadow-sm ${selectCharacterSet && selectCharacterSet.has(character) ? selectedStyling : ""}`} key={`button-${character}`}
                    onClick={isSelecting && onSelectMultipleCharacters ? () => {
                        onSelectMultipleCharacters(character)
                    } : () => {
                        onSelectChosenCharacter(character);
                        router.push('/practice')
                    }}
                >
                    {character}
                </button>
            )}
        </div>
    </div>)
}