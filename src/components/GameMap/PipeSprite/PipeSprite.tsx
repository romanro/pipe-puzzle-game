import React, { FC, useMemo } from 'react';
import { IPipeSpriteProps } from './PipeSprite.models';
import { mapCharToSprite } from 'utils/pipePuzzleUtils';
import useImage from 'use-image';
import { Image } from 'react-konva';

export const PipeSprite: FC<IPipeSpriteProps> = React.memo(
    ({ char, spriteSize = 60, coordinates, onClick }: IPipeSpriteProps) => {
        const img = useMemo(() => mapCharToSprite(char), [char]);

        const [image] = useImage(img);
        const { x, y } = coordinates;

        const onSpriteClick = () => {
            onClick && onClick(x, y);
        };

        return (
            <Image
                image={image}
                width={spriteSize}
                height={spriteSize}
                x={x * spriteSize}
                y={y * spriteSize}
                onClick={onSpriteClick}
            />
        );
    }
);
