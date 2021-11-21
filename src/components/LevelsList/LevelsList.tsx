import classnames from 'classnames';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { ILevelsListProps } from './LevelsList.models';
import styles from './LevelsList.module.scss';

export const LevelsList: FC<ILevelsListProps> = ({ levels = [] }: ILevelsListProps) => {
    return (
        <ul className={styles.levelsList}>
            {levels.map((level) => (
                <li key={level.id}>
                    <Link
                        className={classnames(styles.link, level.password ? styles.done : '')}
                        to={`/game/${level.id}`}>
                        {level.name}
                        {level.password && <span className={styles.password}>Password: {level.password}</span>}
                    </Link>
                </li>
            ))}
        </ul>
    );
};
