export function getInitialStateNumber(key: string, fallback: number) {
    if (typeof window === "undefined") {
        return fallback
    }
    const property = localStorage?.getItem(key)
    if (property === null || typeof Number.parseInt(property) !== 'number') {
        return fallback
    }
    return Number.parseInt(property)
}