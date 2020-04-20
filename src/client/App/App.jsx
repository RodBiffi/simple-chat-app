import React from 'react';
import SocketContext from './context/SocketContext'
import MessagesContext from './context/MessagesContext'

const App = () => {
  return (
    <SocketContext>
        <MessagesContext>
            Basic React App
        </MessagesContext>
    </SocketContext>
  )
};

export default App;
