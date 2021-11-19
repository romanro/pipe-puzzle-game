import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { GameView, Page404, StartView } from 'views';
import styles from './App.module.scss';
function App() {
    return (
        <Router>
            <div className={styles.appContainer}>
                <Routes>
                    <Route path='/' element={<StartView />} />
                    <Route path='game/:level' element={<GameView />} />
                    <Route path='*' element={<Page404 />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
