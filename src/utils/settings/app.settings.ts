import { IGameLevel } from 'models';
import { ISocketSettings } from './app.settings.models';

// For demo only!!!!!!! Needs to be changed to .env implementation

export const SOCKET_SETTINGS: ISocketSettings = {
    SOCKET_URL: 'wss://hometask.eg1236.com/game-pipes/',
    SOCKET_RECONNECTION_TIMEOUT: 200000,
};

export const BASE_GAME_LEVELS: IGameLevel[] = [
    { id: 1, name: 'Very Easy' },
    { id: 2, name: 'Novice Easy' },
    { id: 3, name: 'Rookie Medium' },
    { id: 4, name: 'Lieutenant Hard' },
    { id: 5, name: 'Veteran Very Hard' },
    { id: 6, name: 'General' },
];

export enum LocalStorageKeys {
    LevelPasswords = 'levelPasswords',
    MinTurns = 'levelMinTurns',
}
