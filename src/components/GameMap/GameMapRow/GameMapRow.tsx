import React, { FC } from 'react';
import { PipeSprite } from '../PipeSprite/PipeSprite';
import { IGameMapRowProps } from './GameMapRow.models';
import styles from './GameMapRow.module.scss';

export const GameMapRow: FC<IGameMapRowProps> = React.memo(({ rowData, id, size, onClick }: IGameMapRowProps) => {
    return size > 5 ? (
        <div key={`row_${id}`} className={styles.row}>
            {rowData.split('').map((sprite, x) => (
                <PipeSprite
                    key={`row_${id}_spr_${x}`}
                    size={size}
                    char={sprite}
                    coordinates={{ x, y: id }}
                    onClick={onClick}
                />
            ))}
        </div>
    ) : null;
});
