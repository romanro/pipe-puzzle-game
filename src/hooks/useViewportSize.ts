import { useEffect, useState } from 'react';

export interface Size {
    width: number;
    height: number;
}

export const useViewportSize = (): Size => {
    const [viewportSize, setViewportSize] = useState<Size>({
        width: 0,
        height: 0,
    });
    useEffect(() => {
        function handleResize() {
            setViewportSize({
                width: Math.round(window.innerWidth - 220),
                height: Math.round(window.innerHeight - 300),
            });
        }

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return viewportSize;
};
