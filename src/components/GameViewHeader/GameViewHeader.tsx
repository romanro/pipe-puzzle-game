import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { IGameViewHeaderProps } from './GameViewHeader.models';
import styles from './GameViewHeader.module.scss';

export const GameViewHeader: FC<IGameViewHeaderProps> = ({ level, turnCounter }: IGameViewHeaderProps) => {
    return (
        <header className={styles.header}>
            <h3>Level {level}</h3>
            <h3>Turns: {turnCounter}</h3>
            <Link className={styles.backLink} to={`/`}>
                <button>BACK</button>
            </Link>
        </header>
    );
};
