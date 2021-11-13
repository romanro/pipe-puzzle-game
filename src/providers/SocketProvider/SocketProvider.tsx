import { useEffect, useState, createContext, FC } from 'react';
import { ISocketProvider } from './SocketProvider.models';
import { SOCKET_SETTINGS } from 'utils/settings';

const { SOCKET_URL, SOCKET_RECONNECTION_TIMEOUT } = SOCKET_SETTINGS;
const webSocket = new WebSocket(SOCKET_URL);

export const SocketContext = createContext<WebSocket>(webSocket);

export const SocketProvider: FC<ISocketProvider> = ({ children }: ISocketProvider) => {
    const [ws, setWs] = useState<WebSocket>(webSocket);
    useEffect(() => {
        const onClose = () => {
            console.warn(`Websocket was disconnected!!! Trying to reconnect in ${SOCKET_RECONNECTION_TIMEOUT} ms`);
            setTimeout(() => {
                setWs(new WebSocket(SOCKET_URL));
            }, SOCKET_RECONNECTION_TIMEOUT);
        };

        const onError = () => {
            console.error('There was an error in Websocket');
            window.alert('There was an error in Websocket');
        };

        ws.addEventListener('close', onClose);
        ws.addEventListener('error', onError);
        return () => {
            ws.removeEventListener('close', onClose);
            ws.removeEventListener('error', onError);
        };
    }, [ws, setWs]);
    return <SocketContext.Provider value={ws}>{children}</SocketContext.Provider>;
};
