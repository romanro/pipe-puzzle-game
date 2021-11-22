export interface IGameMapRowProps {
    rowData: string;
    id: number;
    spriteSize: number;
    onClick: (x: number, y: number) => void;
}
