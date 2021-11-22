export interface IGameViewportProps {
    levelMap: ViewMap;
    spriteSize: number;
    onSpriteClick: (x: number, y: number) => void;
}

export type ViewportDimensions = {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    width: number;
    height: number;
};

export type Direction = 'left' | 'right' | 'top' | 'bottom';

export type ViewMap = string[];
