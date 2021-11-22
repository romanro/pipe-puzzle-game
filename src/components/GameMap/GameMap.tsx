import React, { FC, useEffect, useState } from 'react';
import { convertMapDataToBoard, getSpriteSizeByLevel, rotateChar } from 'utils/pipePuzzleUtils';
import { IGameMapProps } from './GameMap.models';
import styles from './GameMap.module.scss';
import { GameViewport } from './GameViewport/GameViewport';

export const GameMap: FC<IGameMapProps> = ({ map, level, onRotate }: IGameMapProps) => {
    const [levelMap, setLevelMap] = useState<string[]>([]);

    const [spriteSize, setSpriteSize] = useState<number>(60);

    useEffect(() => {
        map && setLevelMap(convertMapDataToBoard(map));
    }, [map]);

    useEffect(() => {
        level && setSpriteSize(getSpriteSizeByLevel(level));
    }, [level]);

    const onSpriteClick = (x: number, y: number) => {
        const newMap = [...levelMap];
        newMap[y] = newMap[y].substring(0, x) + rotateChar(newMap[y][x]) + newMap[y].substring(x + 1);
        setLevelMap(newMap);
        onRotate && onRotate(x, y);
    };

    return (
        <div className={styles.boardContainer}>
            {levelMap.length > 0 && (
                <GameViewport spriteSize={spriteSize} levelMap={levelMap} onSpriteClick={onSpriteClick} />
            )}
        </div>
    );
};
