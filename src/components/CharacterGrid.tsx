import { useRouter } from 'next/navigation'
import { useContext } from 'react'
import { CharacterContext, CharacterContextType } from "./ParentWrapper";

export const CharacterGrid = () => {
    const { characterSet, onSelectChosenCharacter } = useContext(CharacterContext) as CharacterContextType
    const router = useRouter()
    return (<div className="p-6">
        <div className="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8 justify-items-center min-w-[80vw] px-6 py-4 border-2 border-slate-200 rounded-xl" data-testid="div-character-grid">
            {Array.from(characterSet).map((character) =>
                <button className="py-2 px-2 min-w-[min(20vw,10rem)] min-h-[min(20vw,10rem)] bg-blue-100 rounded-xl text-[min(5rem,10vw)] text-cyan-950 drop-shadow-md hover:drop-shadow-xl active:drop-shadow-sm" key={`button-${character}`}
                    onClick={() => {
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