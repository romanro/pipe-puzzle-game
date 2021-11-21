import { useLocalStorage } from 'hooks';
import { GameStates } from 'models';
import React, { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { LocalStorageKeys } from 'utils/settings';
import { IGameMessageProps } from './GameMessage.models';
import styles from './GameMessage.module.scss';

export const GameMessage: FC<IGameMessageProps> = ({ status, level }) => {
    const [passwords] = useLocalStorage(LocalStorageKeys.LevelPasswords);

    const renderMessage = (): ReactNode => {
        switch (status) {
            case GameStates.LEVEL_COMPLETED:
                return (
                    <div className={styles.successMsg}>
                        <h2 className={styles.msgTitle}>LEVEL CRACKED!</h2>
                        {passwords?.[parseInt(level)] && (
                            <>
                                <p>Level password is:</p>
                                <h3 className={styles.password}>{passwords?.[parseInt(level)]}</h3>
                            </>
                        )}
                        <Link className={styles.btn} to={`/`}>
                            PLAY ANOTHER LEVEL
                        </Link>
                    </div>
                );
            case GameStates.LEVEL_FILED:
                return (
                    <div className={styles.errorMsg}>
                        <h2 className={styles.msgTitle}>LEVEL FILED!</h2>
                        <p>Only 10 verifications allowed per game, you can't verify your solution</p>
                        <Link className={styles.btn} to={`/`}>
                            PLAY ANOTHER GAME
                        </Link>
                    </div>
                );
            default:
                return <div className={styles.msg}></div>;
        }
    };

    return status !== GameStates.PLAYING ? <div className={styles.messageContainer}>{renderMessage()}</div> : null;
};
