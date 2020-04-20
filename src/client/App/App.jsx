import React from 'react';
import SocketContext from './context/SocketContext';
import MessagesContext from './context/MessagesContext';
import MessagesWidget from './Messages/MessagesWidget';

const App = () => {
    return (
        <SocketContext>
            <MessagesContext>
                <MessagesWidget />
            </MessagesContext>
        </SocketContext>
    );
};

export default App;
