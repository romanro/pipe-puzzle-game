import { LevelsList } from 'components';
import { useLocalStorage } from 'hooks';
import { IGameLevel } from 'models';
import React, { FC, useEffect, useState } from 'react';
import { BASE_GAME_LEVELS, LocalStorageKeys } from 'utils/settings';
import styles from './StartView.module.scss';

export const StartView: FC = () => {
    const [passwords] = useLocalStorage(LocalStorageKeys.LevelPasswords);

    const [levels, setLevels] = useState<IGameLevel[]>([]);

    useEffect(() => {
        const mappedLevels: IGameLevel[] = BASE_GAME_LEVELS.map((l) => {
            return {
                ...l,
                password: passwords?.[l.id],
            };
        });

        setLevels(mappedLevels);
    }, [passwords]);

    return (
        <div>
            <h1 className={styles.gameHeader}>
                THE PIPES<br></br>PUZZLE
            </h1>
            <div className={styles.container}>
                <h3>Choose game level:</h3>
                <LevelsList levels={levels} />
            </div>
        </div>
    );
};
