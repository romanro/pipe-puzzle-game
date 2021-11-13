import { SocketContext } from 'providers';
import { useContext } from 'react';

export const useSocket = (): WebSocket => {
    const socket = useContext<WebSocket>(SocketContext);
    return socket;
};
