import React, { FC } from 'react';
import { CountButton } from './CountButton/CountButton';
import styles from './GameViewFooter.module.scss';

interface IGameViewFooterProps {
    counter: number;
    onVerifyMap: VoidFunction;
}

export const GameViewFooter: FC<IGameViewFooterProps> = ({ counter, onVerifyMap }) => {
    return (
        <footer className={styles.footer}>
            <CountButton
                label={counter === 0 ? 'Only 10 verifications allowed per game' : 'Check your solution'}
                counter={counter}
                onClick={onVerifyMap}
                disabled={counter === 0}
            />
        </footer>
    );
};
