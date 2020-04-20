import React from 'react';

export const Context = React.createContext({});

export const SocketContextProvider = Context.Provider;

export const SocketContextConsumer = Context.Consumer;

const initialState = {
    socket: undefined,
    connected: false,
    send: () => {},
    registerListener: () => {},
    close: () => {},
};

export default (props) => {
    const { children } = props;
    const [socketState, setSocketState] = React.useState(initialState);

    React.useEffect(() => {
        const socket = new WebSocket('ws://localhost:8081');
        setSocketState({ ...socketState, socket });
        socket.onopen = () => {
            setSocketState({ ...socketState, connected: true });
        };
        socket.onerror = (error) => {
            console.error(error);
        };
        socket.onclose = () => {
            setSocketState({ ...socketState, connected: false });
        }
        return () => {
            socket.close();
        }
    }, [])

    return (
        <SocketContextProvider value={socketState}>
            {children}
        </SocketContextProvider>
    );
};
