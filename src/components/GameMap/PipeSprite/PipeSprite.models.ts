export interface IPipeSpriteProps {
    char: string;
    size: number;
    coordinates: { x: number; y: number };
    onClick: (x: number, y: number) => void;
}
