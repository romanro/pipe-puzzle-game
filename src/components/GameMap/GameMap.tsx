import React, { FC } from 'react';
import { IGameMapProps } from './GameMap.models';
import styles from './GameMap.module.scss';

export const GameMap: FC<IGameMapProps> = ({ map, size }: IGameMapProps) => {
    console.log(map);
    return <div className={styles.boardContainer}>GameMap {size}</div>;
};
