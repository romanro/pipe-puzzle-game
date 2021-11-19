import React, { FC } from 'react';
import styles from './CountButton.module.scss';

interface ICountButtonProps {
    label: string;
    counter: number;
    disabled?: boolean;
    onClick?: VoidFunction;
}

export const CountButton: FC<ICountButtonProps> = ({ label, counter, disabled, onClick }) => {
    return (
        <button onClick={onClick} disabled={disabled} className={styles.btn}>
            <span className={styles.label}>{label}</span>
            {!disabled && <span className={styles.counter}>{counter}</span>}
        </button>
    );
};
