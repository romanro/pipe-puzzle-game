import React, { FC, useCallback, useEffect, useState } from 'react';
import { convertMapDataToBoard, getSpriteSizeByLevel, rotateChar } from 'utils/pipePuzzleUtils';
import { IGameMapProps } from './GameMap.models';
import styles from './GameMap.module.scss';
import { GameMapRow } from './GameMapRow/GameMapRow';

export const GameMap: FC<IGameMapProps> = ({ map, level, onRotate }: IGameMapProps) => {
    const [levelMap, setLevelMap] = useState<string[]>([]);
    const [size, setSize] = useState<number>(100);

    useEffect(() => {
        map && setLevelMap(convertMapDataToBoard(map));
    }, [map]);

    useEffect(() => {
        level && setSize(getSpriteSizeByLevel(level));
    }, [level]);

    const onSpriteClick = useCallback(
        (x: number, y: number) => {
            const newMap = [...levelMap];
            newMap[y] = newMap[y].substring(0, x) + rotateChar(newMap[y][x]) + newMap[y].substring(x + 1);
            setLevelMap(newMap);
            onRotate && onRotate(x, y);
        },
        [levelMap]
    );

    return (
        <div className={styles.boardContainer}>
            {levelMap.map((rowData, id) => (
                <GameMapRow id={id} size={size} rowData={rowData} onClick={onSpriteClick} />
            ))}
        </div>
    );
};
