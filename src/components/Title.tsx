interface TitleProps {
    children: string
}

export const Title = ({ children }: TitleProps) => {
    return <h1 className="text-lg text-cyan-950 font-medium px-4 py-4 border-b-2 border-slate-200">{children}</h1>
}