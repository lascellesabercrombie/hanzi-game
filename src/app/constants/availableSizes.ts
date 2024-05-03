interface SizeOption {
    id: number,
    name: string,
    radioStyle: string,
    value: number
}

export const availableSizes: ReadonlyArray<SizeOption> = [
    { id: 1, name: "Small", radioStyle: "text-sm", value: 100 },
    { id: 2, name: "Medium", radioStyle: "text-lg", value: 200 },
    { id: 3, name: "Large", radioStyle: "text-2xl", value: 400 }
]