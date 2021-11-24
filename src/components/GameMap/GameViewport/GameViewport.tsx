import { Size, useViewportSize } from 'hooks';
import React, { FC, useEffect, useState } from 'react';
import { Layer, Stage } from 'react-konva';
import { GameMapRow } from '../GameMapRow/GameMapRow';
import { ViewportDimensions, IGameViewportProps, Direction, ViewMap } from './GameViewport.models';
import { calculateDimensions, calculateNewViewportMap, moveDimensions } from './GameViewport.utils';
import styles from './GameViewport.module.scss';
import ViewPortMapPreview from './ViewPortMapPreview/ViewPortMapPreview';

export const GameViewport: FC<IGameViewportProps> = ({ levelMap, spriteSize, onSpriteClick }) => {
    // TODO: change implementation to useReducer hook
    const [viewportMap, setViewportMap] = useState<ViewMap>([]);
    const [showBtns, setShowBtns] = useState<boolean>(false);
    const [vpDimensions, setVpDimensions] = useState<ViewportDimensions>({
        startX: 0,
        startY: 0,
        endX: levelMap[0].length,
        endY: levelMap.length,
        width: levelMap[0].length,
        height: levelMap.length,
    });
    const viewportSize: Size = useViewportSize();

    useEffect(() => {
        if (spriteSize * levelMap[0].length > viewportSize.width) {
            const dimensions = calculateDimensions(vpDimensions, viewportSize, spriteSize);
            const newMap = calculateNewViewportMap(dimensions, levelMap);
            setVpDimensions(dimensions);
            setViewportMap(newMap);
            setShowBtns(true);
        } else {
            setViewportMap([...levelMap]);
            setShowBtns(false);
        }
    }, [levelMap, spriteSize, viewportSize]);

    const onSpriteClickRecalculate = (x: number, y: number) => {
        const absoluteX = x + vpDimensions.startX;
        const absoluteY = y + vpDimensions.startY;
        onSpriteClick && onSpriteClick(absoluteX, absoluteY);
    };

    const moveMap = (direction: Direction) => {
        const dimensions = calculateDimensions(
            moveDimensions(vpDimensions, direction, levelMap[0].length, levelMap.length),
            viewportSize,
            spriteSize
        );
        const newMap = calculateNewViewportMap(dimensions, levelMap);
        setVpDimensions(dimensions);
        setViewportMap(newMap);
    };

    return viewportMap.length > 0 ? (
        <>
            <div className={styles.container}>
                {showBtns && (
                    <button
                        className={styles.buttonH}
                        disabled={vpDimensions.startY === 0}
                        onClick={() => moveMap('top')}>
                        ▲
                    </button>
                )}
                <div className={styles.innerContainer}>
                    {showBtns && (
                        <button
                            className={styles.buttonV}
                            disabled={vpDimensions.startX === 0}
                            onClick={() => moveMap('left')}>
                            ◄
                        </button>
                    )}
                    <Stage
                        className={styles.stage}
                        width={spriteSize * viewportMap[0].length}
                        height={spriteSize * viewportMap.length}>
                        <Layer>
                            {viewportMap.map((rowData, id) => (
                                <GameMapRow
                                    key={`row_${id}`}
                                    id={id}
                                    spriteSize={spriteSize}
                                    rowData={rowData}
                                    onClick={onSpriteClickRecalculate}
                                />
                            ))}
                        </Layer>
                    </Stage>
                    {showBtns && (
                        <button
                            className={styles.buttonV}
                            disabled={vpDimensions.endX === levelMap[0].length}
                            onClick={() => moveMap('right')}>
                            ►
                        </button>
                    )}
                </div>
                {showBtns && (
                    <button
                        className={styles.buttonH}
                        disabled={vpDimensions.endY === levelMap.length}
                        onClick={() => moveMap('bottom')}>
                        ▼
                    </button>
                )}
            </div>
            {showBtns && (
                <ViewPortMapPreview
                    dimensions={vpDimensions}
                    mapSize={{ width: levelMap[0].length, height: levelMap.length }}
                />
            )}
        </>
    ) : null;
};
