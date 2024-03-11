'use client'
import { useEffect, useState } from 'react';
import { IconButton } from './IconButton';
import SvgPrevious from '@/public/character/SvgPrevious';
import SvgNext from '@/public/character/SvgNext';

interface CarouselProps {
    children: Array<React.ReactNode>
}

export const Carousel = (props: CarouselProps) => {
    const { children } = props
    const [currentIndex, setCurrentIndex] = useState(0)
    const [length, setLength] = useState(children.length)
    const numberToShow = 4
    const next = () => {
        if (currentIndex < (length - numberToShow)) {
            setCurrentIndex(prevState => prevState + 1)
        }
    }

    const prev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prevState => prevState - 1)
        }
    }
    useEffect(() => {
        console.log('length', length)
    }, [length])
    useEffect(() => {
        console.log('currentIndex', currentIndex)
    }, [currentIndex])
    useEffect(() => {
        setLength(children.length)
    }, [children])
    return (
        <div className="w-full flex flex-col">
            <div className="flex w-full relative">

                <div className="overflow-hidden w-full h-full">
                    <div className="flex gap-2 p-2 transform transition-all duration-250 ease-linear" style={{
                        transform: `translateX(-${currentIndex * (100 / numberToShow)}%)`
                    }}
                    >
                        {children}
                    </div>
                </div>
            </div>
            <div className="flex justify-center gap-2">
                <IconButton ariaLabel="Show previous character" disabled={currentIndex <= 0} size={6} onClick={prev}>
                    <SvgPrevious className="*:stroke-cyan-950 max-w-5 max-h-5" />
                </IconButton>
                <IconButton ariaLabel="Show next character"
                    disabled={!(currentIndex < (length - numberToShow))}
                    size={6}
                    onClick={next}>
                    <SvgNext className="*:stroke-cyan-950 max-w-5 max-h-5" />
                </IconButton>
            </div>
        </div>
    );
};

export default Carousel;