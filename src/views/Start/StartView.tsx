import { LevelsList } from 'components';
import { useLocalStorage } from 'hooks';
import { IGameLevel } from 'models';
import React, { FC, useEffect, useState } from 'react';
import { BASE_GAME_LEVELS } from 'utils/settings';
import styles from './StartView.module.scss';

export const StartView: FC = () => {
    const [passwords] = useLocalStorage('levelPasswords');
    const [levels, setLevels] = useState<IGameLevel[]>([]);

    useEffect(() => {
        const mappedLevels: IGameLevel[] = BASE_GAME_LEVELS.map((l) => ({ ...l, password: passwords?.[l.id] }));
        setLevels(mappedLevels);
    }, [passwords]);

    return (
        <div className={styles.container}>
            <h1>THE PIPES PUZZLE</h1>
            <h3>Choose game level:</h3>
            <LevelsList levels={levels} />
        </div>
    );
};
