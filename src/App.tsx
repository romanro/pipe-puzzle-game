import { useSocket } from 'hooks';
import React, { useCallback, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { GameView, Page404, StartView } from 'views';

function App() {
    const socket = useSocket();

    const onMessage = useCallback((message) => {
        const map = message.data?.replace('map:', '');
        console.log(map);
    }, []);

    useEffect(() => {
        socket.addEventListener('message', onMessage);
        return () => {
            socket.removeEventListener('message', onMessage);
        };
    }, [socket, onMessage]);

    const startGame = () => {
        socket.send('new 1');
    };
    const getMap = () => {
        socket.send('map');
    };
    const rotate = () => {
        socket.send('rotate 0 0');
    };

    return (
        <Router>
            <div className='App'>
                <button onClick={startGame}>START</button>
                <button onClick={getMap}>get map</button>
                <button onClick={rotate}>rotate</button>
            </div>
            <Routes>
                <Route path='/' element={<StartView />} />
                <Route path='game/:level' element={<GameView />} />
                <Route path='*' element={<Page404 />} />
            </Routes>
        </Router>
    );
}

export default App;
