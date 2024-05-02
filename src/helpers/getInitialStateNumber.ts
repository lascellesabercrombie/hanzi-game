export function getInitialStateNumber(key: string, fallback: number) {
    if (typeof window === "undefined" || localStorage.getItem(key) === null) {
        return fallback
    }
    const property = localStorage.getItem(key)
    if (typeof property !== 'number') {
        return fallback
    }
    return property
}