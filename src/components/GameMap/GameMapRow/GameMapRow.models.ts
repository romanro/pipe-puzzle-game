export interface IGameMapRowProps {
    rowData: string;
    id: number;
    size: number;
    onClick: (x: number, y: number) => void;
}
