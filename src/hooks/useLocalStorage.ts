import { useEffect, useState } from 'react';

export const useLocalStorage = (key: string) => {
    const [currentValue, setCurrentValue] = useState<string | null>(() => {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : {};
    });

    useEffect(() => {
        currentValue && localStorage.setItem(key, JSON.stringify(currentValue));
    }, [key, currentValue]);

    return [currentValue, setCurrentValue] as const;
};
