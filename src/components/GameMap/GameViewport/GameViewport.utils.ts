import { Size } from 'hooks';
import { Direction, ViewMap, ViewportDimensions } from './GameViewport.models';

// Calculates New Viewport Dimensions based on startX & startY
export const calculateDimensions = (
    currentDimensions: ViewportDimensions,
    viewportSize: Size,
    spriteSize: number
): ViewportDimensions => {
    const width = Math.floor(viewportSize.width / spriteSize);
    const height = Math.floor(viewportSize.height / spriteSize);
    return {
        startX: currentDimensions.startX,
        startY: currentDimensions.startY,
        endX: currentDimensions.startX + width,
        endY: currentDimensions.startY + height,
        width,
        height,
    };
};

// Calculates New Viewport Map Array based on dimensions
export const calculateNewViewportMap = (dimensions: ViewportDimensions, levelMap: ViewMap): ViewMap => {
    const newMap = [];
    for (let i = dimensions.startY; i <= dimensions.endY; i++) {
        const row = levelMap?.[i]?.substring(dimensions.startX, dimensions.endX);
        row && newMap.push(row);
    }
    return newMap;
};

export const moveDimensions = (
    vpDimensions: ViewportDimensions,
    direction: Direction,
    levelMapWidth: number,
    levelMapHeight: number
): ViewportDimensions => {
    const newDimensions = { ...vpDimensions };

    let { startX, startY } = newDimensions;

    switch (direction) {
        case 'right':
            startX = vpDimensions.endX - 2;
            if (startX + vpDimensions.width > levelMapWidth) startX = levelMapWidth - vpDimensions.width;
            break;
        case 'left':
            startX = startX - vpDimensions.width + 2;
            if (startX < 0) startX = 0;
            break;
        case 'bottom':
            startY = vpDimensions.endY - 2;
            if (startY + vpDimensions.height > levelMapHeight) startY = levelMapHeight - vpDimensions.height;
            break;
        case 'top':
            startY = startY - vpDimensions.height + 2;
            if (startY < 0) startY = 0;
            break;
    }

    newDimensions.startX = startX;
    newDimensions.startY = startY;

    return newDimensions;
};
