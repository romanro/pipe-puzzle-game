export interface IGameLevel {
    id: number;
    name: string;
    password?: string;
}

export type LevelPasswordType = {
    [key: number]: string;
};
