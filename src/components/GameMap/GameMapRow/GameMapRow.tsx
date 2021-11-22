import React, { FC } from 'react';
import { PipeSprite } from '../PipeSprite/PipeSprite';
import { IGameMapRowProps } from './GameMapRow.models';

export const GameMapRow: FC<IGameMapRowProps> = React.memo(({ rowData, id, spriteSize, onClick }: IGameMapRowProps) => {
    return (
        <>
            {rowData.split('').map((sprite, x) => (
                <PipeSprite
                    key={`row_${id}_spr_${x}`}
                    spriteSize={spriteSize}
                    char={sprite}
                    coordinates={{ x, y: id }}
                    onClick={onClick}
                />
            ))}
        </>
    );
});
