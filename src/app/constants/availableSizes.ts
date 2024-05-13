interface SizeOption {
    id: number,
    name: string,
    radioStyle: string,
    skeletonStyle: string[],
    value: number
}

export const availableSizes: ReadonlyArray<SizeOption> = [
    { id: 1, name: "Small", radioStyle: "text-sm", skeletonStyle: ["h-[50px] w-[50px]", "h-[100px] w-[100px]"], value: 100 },
    { id: 2, name: "Medium", radioStyle: "text-lg", skeletonStyle: ["h-[100px] w-[100px]", "h-[200px] w-[200px]"], value: 200 },
    { id: 3, name: "Large", radioStyle: "text-2xl", skeletonStyle: ["h-[100px] w-[100px]", "h-[400px] w-[400px]"], value: 400 }
]