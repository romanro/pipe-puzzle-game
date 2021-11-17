import React, { FC, useMemo } from 'react';

import { IPipeSpriteProps } from './PipeSprite.models';
import styles from './PipeSprite.module.scss';
import { mapCharToImage } from 'utils/pipePuzzleUtils';
import classnames from 'classnames';

export const PipeSprite: FC<IPipeSpriteProps> = React.memo(
    ({ char, size = 100, coordinates, onClick }: IPipeSpriteProps) => {
        const { img, css } = useMemo(() => mapCharToImage(char), [char]);
        const { x, y } = coordinates;

        return (
            <img
                src={img}
                style={{ width: size, height: size }}
                alt={char}
                className={classnames(styles.spriteImage, styles[css])}
                onClick={() => onClick(x, y)}
            />
        );
    }
);
