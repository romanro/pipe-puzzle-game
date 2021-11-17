export interface IGameMapProps {
    map: string | null;
    level: number;
    onRotate: (x: number, y: number) => void;
}
