import React, { FC, useCallback, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GameMap, GameViewHeader, GameViewFooter, LoadingIndicator, GameMessage } from 'components';
import { useLocalStorage, useSocket } from 'hooks';
import { GameStates, WebSocketMessagesEnum, WebSocketResponsesEnum } from 'models';
import styles from './GameView.module.scss';
import { LocalStorageKeys } from 'utils/settings';

export const GameView: FC = () => {
    const socket: WebSocket = useSocket();
    let { level = '1' } = useParams<string>();
    const navigate = useNavigate();

    const [passwords, setPasswords] = useLocalStorage(LocalStorageKeys.LevelPasswords);

    // TODO: change implementation to useReducer hook
    const [gameMap, setGameMap] = useState<string | null>(null);
    const [turnCounter, setTurnCounter] = useState<number>(0);
    const [verificationsCounter, setVerificationsCounter] = useState<number>(11);
    const [gameState, setGameState] = useState<GameStates>(GameStates.PLAYING);

    let messageTimer: ReturnType<typeof setTimeout>;

    /// Socket Callbacks
    const onMessage = useCallback(
        (message: MessageEvent<WebSocketResponsesEnum | string>) => {
            if (message?.data.startsWith('map:')) {
                // got Game Map
                setGameMap(message.data);
            } else if (message?.data.startsWith('verify: Correct! Password:')) {
                // got Level Password. Great Success!!!  // verify: Correct! Password: JustWarmingUp
                // setting data to local storage
                const password = message?.data.split('Password:')[1].trim();
                const newPasswords = passwords ? [...passwords] : [];
                newPasswords[parseInt(level)] = password;
                setPasswords(newPasswords);
                setGameState(GameStates.LEVEL_COMPLETED);
            } else {
                switch (message?.data) {
                    case WebSocketResponsesEnum.NEW_GAME_STARTED:
                        // got success response of New Game - should refresh the map
                        socket.send(WebSocketMessagesEnum.CURRENT_MAP);
                        setGameState(GameStates.PLAYING);
                        break;
                    case WebSocketResponsesEnum.PIPE_ROTATED:
                        setTurnCounter(turnCounter + 1);
                        break;
                    case WebSocketResponsesEnum.INCORRECT:
                        setVerificationsCounter(verificationsCounter - 1);
                        setGameState(GameStates.VERIFICATION_INCORRECT);
                        messageTimer = setTimeout(() => setGameState(GameStates.PLAYING), 1500);
                        break;
                    case WebSocketResponsesEnum.NO_MORE_VERIFICATIONS:
                        setVerificationsCounter(0);
                        setGameState(GameStates.LEVEL_FILED);
                        break;
                }
            }
        },
        [socket, turnCounter, verificationsCounter, passwords, level, setPasswords]
    );

    /// Effects
    useEffect(() => {
        return () => {
            clearTimeout(messageTimer);
        };
    });

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
                    <GameMessage status={gameState} level={level} />
                </>
            ) : (
                <LoadingIndicator />
            )}
        </div>
    );
};
