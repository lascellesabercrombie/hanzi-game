export const getInitialState = (key: string, fallback: boolean) => {
    if (localStorage.getItem(key) === null) {
        return fallback
    }
    return localStorage.getItem(key) === 'true'
}