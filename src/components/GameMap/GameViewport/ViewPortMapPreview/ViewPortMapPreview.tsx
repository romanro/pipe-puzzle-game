import { Size, useViewportSize } from 'hooks';
import React, { FC, useEffect, useState } from 'react';
import { IViewPortMapPreviewProps } from './ViewPortMapPreview.models';
import styles from './ViewPortMapPreview.module.scss';

const ViewPortMapPreview: FC<IViewPortMapPreviewProps> = ({ dimensions, mapSize }: IViewPortMapPreviewProps) => {
    const [hover, setHover] = useState<boolean>(false);
    const [spriteSize, setSpriteSize] = useState<number>(1);

    const viewportSize: Size = useViewportSize();

    const { width, height } = mapSize;

    useEffect(() => {
        setSpriteSize(viewportSize.width / width / 2.5);
    }, [width, height, viewportSize.width]);

    return (
        <div className={styles.container}>
            {hover && (
                <div
                    className={styles.gameMap}
                    style={{ width: `${spriteSize * width}px`, height: `${spriteSize * height}px` }}>
                    <div
                        className={styles.viewport}
                        style={{
                            width: `${spriteSize * dimensions.width}px`,
                            height: `${spriteSize * dimensions.height}px`,
                            top: `${spriteSize * dimensions.startY}px`,
                            left: `${spriteSize * dimensions.startX}px`,
                        }}></div>
                </div>
            )}
            <button className={styles.btn} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                ?
            </button>
        </div>
    );
};

export default ViewPortMapPreview;
