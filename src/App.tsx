import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { GameView, Page404, StartView } from 'views';
import styles from './App.module.scss';
import background from './pipeBg.png';

function App() {
    return (
        <Router>
            <div className={styles.appContainer} style={{ backgroundImage: `url(${background})` }}>
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
