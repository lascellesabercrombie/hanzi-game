export const onToggleSetting = (name: string, state: boolean, setState: (state: boolean) => void) => {
    setState(!state)
    localStorage.setItem(name, (!state).toString())
}