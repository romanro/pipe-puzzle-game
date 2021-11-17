import React, { FC, useMemo } from 'react';
import { IPipeSpriteProps } from './PipeSprite.models';
import { mapCharToSprite } from 'utils/pipePuzzleUtils';
import useImage from 'use-image';
import { Image } from 'react-konva';

export const PipeSprite: FC<IPipeSpriteProps> = React.memo(
    ({ char, size = 100, coordinates, onClick }: IPipeSpriteProps) => {
        const img = useMemo(() => mapCharToSprite(char), [char]);

        const [image] = useImage(img);
        const { x, y } = coordinates;

        return (
            <Image image={image} width={size} height={size} x={x * size} y={y * size} onClick={() => onClick(x, y)} />
        );
    }
);
