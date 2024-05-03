export function getInitialStateNumber(key: string, fallback: number) {
    const property = localStorage?.getItem(key)
    if (typeof window === "undefined" || property === null || typeof Number.parseInt(property) !== 'number') {
        return fallback
    }
    return Number.parseInt(property)
}