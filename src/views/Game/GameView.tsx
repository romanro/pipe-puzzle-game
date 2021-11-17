import React, { FC, useCallback, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GameMap, GameViewHeader, GameViewFooter, LoadingIndicator } from 'components';
import { useSocket } from 'hooks';
import { WebSocketMessagesEnum, WebSocketResponsesEnum } from 'models';
import styles from './GameView.module.scss';

export const GameView: FC = () => {
    const socket: WebSocket = useSocket();
    let { level = '1' } = useParams<string>();
    const navigate = useNavigate();

    const [gameMap, setGameMap] = useState<string | null>(null);
    const [turnCounter, setTurnCounter] = useState<number>(0);
    const [verificationsCounter, setVerificationsCounter] = useState<number>(10);

    /// Socket Callbacks
    const onMessage = useCallback(
        (message: MessageEvent<WebSocketResponsesEnum | string>) => {
            if (message?.data.startsWith('map:')) {
                // got Game Map
                setGameMap(message.data);
            } else {
                console.log(message?.data);
                switch (message?.data) {
                    case WebSocketResponsesEnum.NEW_GAME_STARTED:
                        // got success response of New Game - should refresh the map
                        socket.send(WebSocketMessagesEnum.CURRENT_MAP);
                        break;
                    case WebSocketResponsesEnum.PIPE_ROTATED:
                        setTurnCounter(turnCounter + 1);
                        break;
                    case WebSocketResponsesEnum.INCORRECT:
                        setVerificationsCounter(verificationsCounter - 1);
                        break;
                    case WebSocketResponsesEnum.NO_MORE_VERIFICATIONS:
                        setVerificationsCounter(0);
                        break;
                    // verify: Correct! Password: JustWarmingUp
                }
            }
        },
        [socket, turnCounter, verificationsCounter]
    );

    /// Effects
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

    /// UI Callbacks
    const onRotatePipe = (x: number, y: number) => {
        socket.send(`${WebSocketMessagesEnum.ROTATE} ${x} ${y}`);
    };

    const onVerifyMap = () => {
        socket.send(WebSocketMessagesEnum.VERIFY);
    };

    return (
        <div className={styles.gameViewContainer}>
            {gameMap ? (
                <>
                    <GameViewHeader level={level} turnCounter={turnCounter} />
                    <GameMap map={gameMap} level={parseInt(level)} onRotate={onRotatePipe} />
                    <GameViewFooter counter={verificationsCounter} onVerifyMap={onVerifyMap} />
                </>
            ) : (
                <LoadingIndicator />
            )}
        </div>
    );
};
