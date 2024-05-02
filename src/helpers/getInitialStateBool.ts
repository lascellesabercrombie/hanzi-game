export const getInitialStateBool = (key: string, fallback: boolean) => {
    if (typeof window === "undefined" || localStorage.getItem(key) === null) {
        return fallback
    }
    return localStorage.getItem(key) === 'true'
}