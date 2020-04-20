import React from 'react';

export const Context = React.createContext({});

const initialState = {
    socket: {},
    connected: false,
    send: () => {},
    subscribe: () => {},
    close: () => {},
};

export default (props) => {
    const { children } = props;
    const [socket, setSocket] = React.useState();
    const [contextState, setContextState] = React.useState(initialState);

    const sendHandler = (message) => {
        socket.send(JSON.stringify(message));
    };

    const addListenerHandler = (handler) => {
        socket.addEventListener('message', ({ data }) => {
            try {
                handler(JSON.parse(data))
            } catch(error) {
                console.error(error);
            }
        })
    };

    React.useEffect(() => {
        const socket = new WebSocket('ws://localhost:8081');
        setSocket(socket);
        return () => {
            socket.close();
        }
    }, [setSocket]);

    React.useEffect(() => {
        if (socket) {
            socket.onopen = () => {
                setContextState(prevState => ({ ...prevState, connected: true }));
            };
            socket.onerror = (error) => {
                console.error(error);
            };
            socket.onclose = () => {
                setContextState(prevState => ({ ...prevState, connected: false }));
            }
            setContextState(prevState => ({
                ...prevState,
                send: sendHandler,
                subscribe: addListenerHandler
            }));
        }
    }, [socket]);

    return (
        <Context.Provider value={contextState}>
            {children}
        </Context.Provider>
    );
};
