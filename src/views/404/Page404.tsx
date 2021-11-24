import React, { FC } from 'react';
import styles from './Page404.module.scss';

export const Page404: FC = () => {
    return (
        <div className={styles.container}>
            <h2>ERROR 404</h2>
            <h3>Page not found</h3>
        </div>
    );
};
