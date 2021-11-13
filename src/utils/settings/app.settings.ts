import { ISocketSettings } from './app.settings.models';

// For demo only!!!!!!! Needs to be changed to .env implementation

export const SOCKET_SETTINGS: ISocketSettings = {
    SOCKET_URL: 'wss://hometask.eg1236.com/game-pipes/',
    SOCKET_RECONNECTION_TIMEOUT: 200000,
};
