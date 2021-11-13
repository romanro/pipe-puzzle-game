import { useEffect, useState, createContext } from 'react';
import { ISocketProvider } from './SocketProvider.models';
import { SOCKET_SETTINGS } from 'utils/settings';

const { SOCKET_URL, SOCKET_RECONNECTION_TIMEOUT } = SOCKET_SETTINGS;
const webSocket = new WebSocket(SOCKET_URL);

export const SocketContext = createContext<WebSocket>(webSocket);

export const SocketProvider = (props: ISocketProvider) => {
    const [ws, setWs] = useState<WebSocket>(webSocket);
    useEffect(() => {
        const onClose = () => {
            setTimeout(() => {
                setWs(new WebSocket(SOCKET_URL));
            }, SOCKET_RECONNECTION_TIMEOUT);
        };
        ws.addEventListener('close', onClose);
        return () => {
            ws.removeEventListener('close', onClose);
        };
    }, [ws, setWs]);
    return <SocketContext.Provider value={ws}>{props.children}</SocketContext.Provider>;
};
