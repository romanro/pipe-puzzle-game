export interface IPipeSpriteProps {
    char: string;
    spriteSize: number;
    coordinates: { x: number; y: number };
    onClick: (x: number, y: number) => void;
}
