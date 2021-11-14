import { GameMap, GameViewHeader } from 'components';
import { useSocket } from 'hooks';
import { WebSocketMessagesEnum, WebSocketResponsesEnum } from 'models';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './GameView.module.scss';

export const GameView: FC = () => {
    const socket: WebSocket = useSocket();
    let { level = '1' } = useParams<string>();
    const navigate = useNavigate();
    const [gameMap, setGameMap] = useState<string | null>(null);

    const onMessage = useCallback(
        (message: MessageEvent<WebSocketResponsesEnum | string>) => {
            if ([WebSocketResponsesEnum.NEW_GAME_STARTED].includes(message?.data as WebSocketResponsesEnum)) {
                // got success response of New Game or Rotate, should refresh the map
                socket.send(WebSocketMessagesEnum.CURRENT_MAP);
            } else if (message?.data.startsWith('map:')) {
                // got Game Map
                setGameMap(message.data);
            }
        },
        [socket]
    );

    useEffect(() => {
        if (socket.readyState === WebSocket.OPEN) {
            // starting new game
            socket.send(`${WebSocketMessagesEnum.NEW_GAME} ${level}`);
        } else {
            // socket is not ready
            navigate('/');
        }
    }, [socket, level, navigate]);

    useEffect(() => {
        socket.addEventListener('message', onMessage);
        return () => {
            socket.removeEventListener('message', onMessage);
        };
    }, [socket, onMessage]);

    return (
        <div className={styles.gameViewContainer}>
            <GameViewHeader level={level} />
            <GameMap map={gameMap} size={parseInt(level)} />
        </div>
    );
};
